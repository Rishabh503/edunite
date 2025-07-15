# import cv2
# import numpy as np
# from openvino.runtime import Core
# import time

# MODEL_XML = "intel/emotions-recognition-retail-0003/FP32/emotions-recognition-retail-0003.xml"
# MODEL_BIN = "intel/emotions-recognition-retail-0003/FP32/emotions-recognition-retail-0003.bin"

# EMOTIONS = ["neutral", "happy", "sad", "surprise", "anger", "confusion"]

# ie = Core()
# model = ie.read_model(model=MODEL_XML)
# compiled_model = ie.compile_model(model=model, device_name="CPU")
# input_layer = compiled_model.input(0)
# output_layer = compiled_model.output(0)

# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# cap = cv2.VideoCapture(0)
# print("Press 'q' to quit.")

# # For confusion detection
# neutral_start_time = None
# last_emotion = None

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces = face_cascade.detectMultiScale(gray, 1.3, 5)
#     for (x, y, w, h) in faces:
#         face_img = frame[y:y+h, x:x+w]
#         face_img = cv2.resize(face_img, (64, 64))
#         face_img = face_img.transpose((2, 0, 1))  # HWC to CHW
#         face_img = np.expand_dims(face_img, axis=0)
#         face_img = face_img.astype(np.float32)
#         # Run inference
#         result = compiled_model([face_img])[output_layer]
#         probs = result[0]
#         neutral, happy, sad, surprise, anger = probs

#         # Confusion logic
#         confusion = False
#         # 1. Surprise + Neutral (both moderately high)
#         if surprise > 0.3 and neutral > 0.3:
#             confusion = True
#         # 2. Anger (low) + Surprise (moderate)
#         elif 0.2 < anger < 0.5 and surprise > 0.3:
#             confusion = True
#         # 3. Prolonged Neutral (over 2 seconds)
#         elif neutral > 0.6:
#             if last_emotion == "neutral":
#                 if neutral_start_time and (time.time() - neutral_start_time > 2):
#                     confusion = True
#             else:
#                 neutral_start_time = time.time()
#         else:
#             neutral_start_time = None

#         # Main emotion
#         emotion_idx = np.argmax(probs)
#         emotion_label = EMOTIONS[emotion_idx]
#         if confusion:
#             emotion_label = "confusion"

#         last_emotion = "neutral" if neutral > 0.6 else None

#         # Show all probabilities
#         for i, prob in enumerate(probs):
#             text = f"{EMOTIONS[i]}: {float(prob):.2f}"
#             cv2.putText(frame, text, (x, y + h + 25 + i*20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 2)
#         # Draw rectangle and main emotion
#         cv2.rectangle(frame, (x, y), (x+w, y+h), (0,255,0), 2)
#         cv2.putText(frame, f"Main: {emotion_label}", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
#     cv2.imshow("OpenVINO Emotion Detection (with Confusion)", frame)
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break
# cap.release()
# cv2.destroyAllWindows()












# import cv2
# import numpy as np
# from openvino.runtime import Core
# import time

# MODEL_XML = "intel/emotions-recognition-retail-0003/FP32/emotions-recognition-retail-0003.xml"
# MODEL_BIN = "intel/emotions-recognition-retail-0003/FP32/emotions-recognition-retail-0003.bin"

# EMOTIONS = ["neutral", "happy", "sad", "surprise", "anger"]

# ie = Core()
# model = ie.read_model(model=MODEL_XML)
# compiled_model = ie.compile_model(model=model, device_name="CPU")
# input_layer = compiled_model.input(0)
# output_layer = compiled_model.output(0)

# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# cap = cv2.VideoCapture(0)
# print("Press 'q' to quit.")

# # For confusion detection
# neutral_start_time = None
# last_emotion = None

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break

#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces = face_cascade.detectMultiScale(gray, 1.3, 5)

#     for (x, y, w, h) in faces:
#         face_img = frame[y:y+h, x:x+w]
#         face_img = cv2.resize(face_img, (64, 64))
#         face_img = face_img.transpose((2, 0, 1))  # HWC to CHW
#         face_img = np.expand_dims(face_img, axis=0).astype(np.float32)

#         # Inference
#         result = compiled_model([face_img])[output_layer]
#         probs = result[0]
#         neutral, happy, sad, surprise, anger = probs

#         # Confusion logic
#         confusion = False

#         # 1. Surprise + Neutral (both moderately high)
#         if surprise > 0.2 and neutral > 0.2:
#             confusion = True

#         # 2. Anger low + Surprise high
#         elif 0.1 < anger < 0.5 and surprise > 0.2:
#             confusion = True

#         # 3. Prolonged Neutral
#         elif neutral > 0.6:
#             if last_emotion == "neutral":
#                 if neutral_start_time and (time.time() - neutral_start_time > 1.5):
#                     confusion = True
#             else:
#                 neutral_start_time = time.time()
#         else:
#             neutral_start_time = None

#         # Main emotion
#         if confusion:
#             emotion_label = "confusion"
#         else:
#             emotion_idx = np.argmax(probs)
#             emotion_label = EMOTIONS[emotion_idx]

#         # Keep track of last emotion
#         last_emotion = "neutral" if neutral > 0.6 else None

#         # Print debug info
#         print(f"Neutral: {neutral.item():.2f}, Surprise: {surprise.item():.2f}, Anger: {anger.item():.2f}, Confusion: {confusion}")

#         # Show probabilities on screen
#         for i, prob in enumerate(probs):
#             text = f"{EMOTIONS[i]}: {float(prob):.2f}"
#             cv2.putText(frame, text, (x, y + h + 25 + i*20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 2)

#         # Show confusion value
#         cv2.putText(frame, f"confusion: {1.0 if confusion else 0.0}", 
#                     (x, y + h + 25 + len(probs)*20), 
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)

#         # Draw box and label
#         cv2.rectangle(frame, (x, y), (x+w, y+h), (0,255,0), 2)
#         cv2.putText(frame, f"Main: {emotion_label}", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)

#     cv2.imshow("OpenVINO Emotion Detection (with Confusion)", frame)
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()



import cv2
import numpy as np
import time
from keras.models import load_model
from keras.preprocessing.image import img_to_array
from openvino.runtime import Core

# === Load OpenVINO Emotion Model ===
EMOTIONS = ["neutral", "happy", "sad", "surprise", "anger"]
ov_model_xml = "intel/emotions-recognition-retail-0003/FP32/emotions-recognition-retail-0003.xml"

ie = Core()
ov_model = ie.read_model(model=ov_model_xml)
ov_compiled_model = ie.compile_model(model=ov_model, device_name="CPU")
ov_input_layer = ov_compiled_model.input(0)
ov_output_layer = ov_compiled_model.output(0)

# === Load Keras Binary Confusion Model ===
keras_model = load_model('./emotion_model.h5')

# === Load Face Detector ===
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# === Webcam ===
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Webcam not accessible.")
    exit()

print("Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame.")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        face_img = frame[y:y+h, x:x+w]
        face_gray = gray[y:y+h, x:x+w]

        # === Keras Binary Confusion Model ===
        resized_gray = cv2.resize(face_gray, (48, 48), interpolation=cv2.INTER_AREA)
        if np.sum([resized_gray]) != 0:
            face_array = resized_gray.astype('float') / 255.0
            face_array = img_to_array(face_array)
            face_array = np.expand_dims(face_array, axis=0)
            prediction = keras_model.predict(face_array)[0][0]
            binary_label = 'Confused' if prediction > 0.5 else 'Not Confused'
        else:
            binary_label = 'Face not clear'

        # === OpenVINO Multi-Emotion Model ===
        resized_ov = cv2.resize(face_img, (64, 64))
        ov_input = resized_ov.transpose((2, 0, 1))  # HWC to CHW
        ov_input = np.expand_dims(ov_input, axis=0).astype(np.float32)
        ov_result = ov_compiled_model([ov_input])[ov_output_layer]
        probs = [float(p) for p in ov_result[0]]
        main_emotion = EMOTIONS[np.argmax(probs)]

        # === Annotate frame ===
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(frame, f"Emotion: {main_emotion}", (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2)
        cv2.putText(frame, f"{binary_label}", (x, y+h+30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255) if 'Confused' in binary_label else (0, 255, 0), 2)

        # Show probabilities (optional)
        for i, prob in enumerate(probs):
            cv2.putText(frame, f"{EMOTIONS[i]}: {prob:.2f}", (x, y + h + 50 + i*20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)

    cv2.imshow("Emotion + Confusion Detection", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
