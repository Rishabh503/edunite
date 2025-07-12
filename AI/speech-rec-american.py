import numpy as np
import sounddevice as sd
import time
import librosa
import scipy
from openvino.runtime import Core, PartialShape
from textblob import TextBlob

MODEL_XML = "public/quartznet-15x5-en/FP16/quartznet-15x5-en.xml"
NOISE_MODEL_XML = "intel/noise-suppression-poconetlike-0001/FP32/noise-suppression-poconetlike-0001.xml"
DEVICE = "CPU"
SAMPLE_RATE = 16000
CHUNK_DURATION = 3  # seconds
CHUNK_SIZE = SAMPLE_RATE * CHUNK_DURATION
ALPHABET = " abcdefghijklmnopqrstuvwxyz'~"  # ~ is blank symbol
PAD_TO = 16
POCO_PATCH_SIZE = 2048
BLANK_ID = len(ALPHABET) - 1

def audio_to_melspectrum(audio, sampling_rate):
    preemph = 0.97
    preemphased = np.concatenate([audio[:1], audio[1:] - preemph * audio[:-1].astype(np.float32)])
    win_length = round(sampling_rate * 0.02)
    spec = np.abs(librosa.stft(preemphased, n_fft=512, hop_length=round(sampling_rate * 0.01),
        win_length=win_length, center=True, window=scipy.signal.windows.hann(win_length), pad_mode='reflect'))
    mel_basis = librosa.filters.mel(sr=sampling_rate, n_fft=512, n_mels=64, fmin=0.0, fmax=8000.0, norm='slaney', htk=False)
    log_melspectrum = np.log(np.dot(mel_basis, np.power(spec, 2)) + 2 ** -24)
    normalized = (log_melspectrum - log_melspectrum.mean(1)[:, None]) / (log_melspectrum.std(1)[:, None] + 1e-5)
    remainder = normalized.shape[1] % PAD_TO
    if remainder != 0:
        normalized = np.pad(normalized, ((0, 0), (0, PAD_TO - remainder)))
    return normalized[None]

def ctc_greedy_decode(pred):
    prev_id = BLANK_ID
    transcription = []
    for idx in pred[0].argmax(1):
        if prev_id != idx != BLANK_ID:
            transcription.append(ALPHABET[idx])
        prev_id = idx
    return ''.join(transcription)

def suppress_noise(core, compiled_noise_model, chunk): #noise suppression using poconetlike model
    input_size = POCO_PATCH_SIZE
    inp_shapes = {name: obj.shape for obj in compiled_noise_model.inputs for name in obj.get_names()}
    state_inp_names = [n for n in inp_shapes.keys() if "state" in n]
    state_out_names = [n.replace('inp', 'out') for n in state_inp_names]
    cleaned = []
    res_states = {}
    num_patches = int(np.ceil(len(chunk) / input_size))
    for i in range(num_patches):
        patch = chunk[i*input_size:(i+1)*input_size]
        if len(patch) < input_size:
            patch = np.pad(patch, (0, input_size - len(patch)), mode='constant')
        inputs = {"input": patch[None, :].astype(np.float32)}
        for n in state_inp_names:
            if i == 0:
                inputs[n] = np.zeros(inp_shapes[n], dtype=np.float32)
            else:
                inputs[n] = res_states[n]
        result = compiled_noise_model(inputs)
        cleaned_patch = result[compiled_noise_model.output("output")].squeeze(0)
        cleaned.append(cleaned_patch)
        for n in state_inp_names:
            res_states[n] = result[compiled_noise_model.output(n.replace('inp', 'out'))]
    cleaned_audio = np.concatenate(cleaned)
    cleaned_audio = cleaned_audio[640:len(chunk)+640]
    return cleaned_audio

def main():
    print(sd.query_devices())
    print("Loading models...")
    core = Core()
    dummy_audio = np.zeros((1, 64, CHUNK_SIZE // 10), dtype=np.float32)
    model = core.read_model(MODEL_XML)
    input_layer = model.input(0)
    shape = input_layer.partial_shape
    shape[2] = -1
    model.reshape({input_layer: PartialShape(shape)})
    compiled_model = core.compile_model(model, DEVICE)
    output_layer = compiled_model.output(0)
    noise_model = core.read_model(NOISE_MODEL_XML)
    compiled_noise_model = core.compile_model(noise_model, DEVICE)

    print("Listening... (Press Ctrl+C to stop)")
    stream = sd.InputStream(samplerate=SAMPLE_RATE, channels=1, dtype='float32')
    stream.start()
    try:
        while True:
            data, _ = stream.read(CHUNK_SIZE)
            chunk = data.flatten()
            cleaned_chunk = suppress_noise(core, compiled_noise_model, chunk)
            chunk_int16 = (cleaned_chunk * 32767).astype(np.int16)
            melspec = audio_to_melspectrum(chunk_int16, SAMPLE_RATE).astype(np.float32)
            result = compiled_model([melspec])[output_layer]
            text = ctc_greedy_decode(result)
            corrected_text = str(TextBlob(text).correct())
            print(f"Raw: {text} | Corrected: {corrected_text}")
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("Stopped.")
    finally:
        stream.stop()
        stream.close()

if __name__ == "__main__":
    main()