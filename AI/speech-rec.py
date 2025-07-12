import numpy as np
import sounddevice as sd
import time
import librosa
import scipy
from openvino.runtime import Core, PartialShape

print(sd.query_devices())

MODEL_XML = "public/quartznet-15x5-en/FP16/quartznet-15x5-en.xml"
DEVICE = "CPU"
SAMPLE_RATE = 16000
CHUNK_DURATION = 3  # seconds
CHUNK_SIZE = SAMPLE_RATE * CHUNK_DURATION
ALPHABET = " abcdefghijklmnopqrstuvwxyz'"
PAD_TO = 16

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
    prev_id = blank_id = len(ALPHABET)
    transcription = []
    for idx in pred[0].argmax(1):
        if prev_id != idx != blank_id:
            transcription.append(ALPHABET[idx])
        prev_id = idx
    return ''.join(transcription)

def main():
    print("Loading model...")
    core = Core()
    # Dummy input for shape inference
    dummy_audio = np.zeros((1, 64, CHUNK_SIZE // 10), dtype=np.float32)
    model = core.read_model(MODEL_XML)
    input_layer = model.input(0)
    # Reshape model to accept variable-length input
    shape = input_layer.partial_shape
    shape[2] = -1
    model.reshape({input_layer: PartialShape(shape)})
    compiled_model = core.compile_model(model, DEVICE)
    output_layer = compiled_model.output(0)

    print("Listening... (Press Ctrl+C to stop)")
    stream = sd.InputStream(samplerate=SAMPLE_RATE, channels=1, dtype='float32')
    stream.start()
    try:
        while True:
            data, _ = stream.read(CHUNK_SIZE)
            chunk = data.flatten()
            chunk_int16 = (chunk * 32767).astype(np.int16)
            melspec = audio_to_melspectrum(chunk_int16, SAMPLE_RATE).astype(np.float32)
            result = compiled_model([melspec])[output_layer]
            text = ctc_greedy_decode(result)
            print("Recognized:", text)
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("Stopped.")
    finally:
        stream.stop()
        stream.close()

if __name__ == "__main__":
    main()