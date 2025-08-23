from flask import Flask, request, jsonify
import cv2
import numpy as np
from deepface import DeepFace
import mediapipe as mp
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize MediaPipe
mp_face_mesh = mp.solutions.face_mesh
mp_holistic = mp.solutions.holistic
face_mesh = mp_face_mesh.FaceMesh(max_num_faces=1, refine_landmarks=True)
holistic = mp_holistic.Holistic()

# Landmark indices
LEFT_EYE = [33, 160, 158, 133, 153, 144]
RIGHT_EYE = [362, 385, 387, 263, 373, 380]
UPPER_LIP = 13
LOWER_LIP = 14
SHOULDER_LEFT = 11
SHOULDER_RIGHT = 12

def calculate_eye_aspect_ratio(eye):
    vert1 = np.linalg.norm(np.array(eye[1]) - np.array(eye[5]))
    vert2 = np.linalg.norm(np.array(eye[2]) - np.array(eye[4]))
    horiz = np.linalg.norm(np.array(eye[0]) - np.array(eye[3]))
    return (vert1 + vert2) / (2.0 * horiz)

@app.route('/analyze', methods=['POST'])
def analyze():
    # Initialize metrics with default values
    metrics = {
        'blink_count': 0,
        'lip_biting': False,
        'gaze_direction': "Center",
        'hand_on_face': False,
        'fidgeting': False,
        'shrugging': False,
        'emotion': "Neutral",
        'nervousness_score': 0,
        'eye_contact_score': 100,
        'feedback': "Analysis in progress"
    }

    try:
        # Get frame data from request
        frame_data = request.json.get('frame')
        if not frame_data:
            return jsonify(metrics)
            
        # Decode base64 image
        header, encoded = frame_data.split(",", 1)
        img_bytes = base64.b64decode(encoded)
        nparr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify(metrics)

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        h, w, _ = frame.shape

        # Emotion detection
        try:
            result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
            metrics['emotion'] = result[0]['dominant_emotion']
        except Exception as e:
            print(f"Emotion detection error: {str(e)}")

        # Face mesh analysis
        results_face = face_mesh.process(rgb)
        results_holistic = holistic.process(rgb)

        # Initialize analysis variables
        blink_detected = False
        lip_biting = False
        gaze_dir = "Center"
        hand_on_face = False
        fidgeting = False
        shrugging = False
        eye_contact_frames = 0
        total_frames = 1  # Avoid division by zero

        if results_face.multi_face_landmarks:
            landmarks = results_face.multi_face_landmarks[0].landmark

            # Blink detection
            left_eye = [(landmarks[i].x * w, landmarks[i].y * h) for i in LEFT_EYE]
            right_eye = [(landmarks[i].x * w, landmarks[i].y * h) for i in RIGHT_EYE]
            left_ear = calculate_eye_aspect_ratio(left_eye)
            right_ear = calculate_eye_aspect_ratio(right_eye)
            avg_ear = (left_ear + right_ear) / 2.0

            if avg_ear < 0.21:
                blink_detected = True
                metrics['blink_count'] = 1

            # Lip biting detection (FIXED)
            lip_dist = abs((landmarks[UPPER_LIP].y - landmarks[LOWER_LIP].y) * h)
            lip_biting = lip_dist < 5
            metrics['lip_biting'] = lip_biting

            # Gaze direction
            eye_center_x = (landmarks[33].x + landmarks[263].x) / 2
            face_center_x = landmarks[1].x
            if eye_center_x - face_center_x > 0.03:
                gaze_dir = "Right"
            elif eye_center_x - face_center_x < -0.03:
                gaze_dir = "Left"
            else:
                eye_contact_frames = 1

            metrics['gaze_direction'] = gaze_dir

        # Holistic analysis (hands and pose)
        if results_holistic:
            # Hand on face detection
            for hand_landmarks in [results_holistic.right_hand_landmarks, results_holistic.left_hand_landmarks]:
                if hand_landmarks:
                    for point in hand_landmarks.landmark:
                        x, y = point.x * w, point.y * h
                        if w//3 < x < 2*w//3 and y < h//2:
                            hand_on_face = True
                            break
                    if hand_on_face:
                        break

            metrics['hand_on_face'] = hand_on_face

            # Shrugging detection
            if results_holistic.pose_landmarks:
                left = results_holistic.pose_landmarks.landmark[SHOULDER_LEFT]
                right = results_holistic.pose_landmarks.landmark[SHOULDER_RIGHT]
                shrugging = abs(left.y - right.y) > 0.1
                metrics['shrugging'] = shrugging

        # Calculate scores
        score = 0
        if blink_detected: score += 1
        if lip_biting: score += 1
        if hand_on_face: score += 1
        if gaze_dir != "Center": score += 1
        if shrugging: score += 1
        metrics['nervousness_score'] = min(100, (score / 5) * 100)

        metrics['eye_contact_score'] = int((eye_contact_frames / total_frames) * 100) if total_frames > 0 else 100

        # Generate feedback
        if metrics['nervousness_score'] > 70:
            metrics['feedback'] = "Try to relax and maintain eye contact"
        elif metrics['nervousness_score'] > 40:
            metrics['feedback'] = "Good effort, try to be more confident"
        else:
            metrics['feedback'] = "Excellent composure"

    except Exception as e:
        print(f"Analysis error: {str(e)}")
        metrics['feedback'] = "Analysis temporarily unavailable"

    return jsonify(metrics)

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
