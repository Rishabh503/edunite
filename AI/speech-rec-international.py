import speech_recognition as sr
from textblob import TextBlob

def main():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()
    print("Listening... (Press Ctrl+C to stop)")
    try:
        while True:
            with mic as source:
                recognizer.adjust_for_ambient_noise(source)
                print("Say something:")
                audio = recognizer.listen(source)
            try:
                text = recognizer.recognize_google(audio)
                corrected_text = str(TextBlob(text).correct())
                print(f"Raw: {text} | Corrected: {corrected_text}")
            except sr.UnknownValueError:
                print("Could not understand audio.")
            except sr.RequestError as e:
                print(f"Recognition error: {e}")
    except KeyboardInterrupt:
        print("Stopped.")

if __name__ == "__main__":
    main()