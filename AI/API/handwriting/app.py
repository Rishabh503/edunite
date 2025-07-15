# from flask import Flask, request, jsonify
# from skimage.filters.rank import entropy
# from skimage.morphology import disk
# import numpy as np
# import cv2
# import os
# from openvino.runtime import Core
# from PIL import Image
# import uuid

# app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = 'uploads'

# # Model paths
# model_xml = os.path.join("model", "handwritten-english-recognition-0001", "FP32", "handwritten-english-recognition-0001.xml")
# symbol_txt = os.path.join("model", "handwritten-english-recognition-0001", "gnhk.txt")

# # Load model and symbol map once on startup
# ie = Core()
# model = ie.read_model(model=model_xml)
# compiled_model = ie.compile_model(model=model, device_name="CPU")
# output_layer = compiled_model.output(0)

# with open(symbol_txt, "r", encoding="utf-8") as f:
#     symbol_map = ''.join(line.rstrip("\n") for line in f)

# def binarize(img):
#     entr = entropy(img, disk(5))
#     MAX_ENTROPY = 8.0
#     MAX_PIX_VAL = 255
#     negative = 1 - (entr / MAX_ENTROPY)
#     u8img = (negative * MAX_PIX_VAL).astype(np.uint8)
#     _, mask = cv2.threshold(u8img, 0, MAX_PIX_VAL, cv2.THRESH_OTSU)
#     masked = cv2.bitwise_and(img, img, mask=mask)
#     kernel = np.ones((35, 35), np.uint8)
#     background = cv2.dilate(masked, kernel, iterations=1)
#     text_only = cv2.absdiff(img, background)
#     neg_text_only = (MAX_PIX_VAL - text_only) * 1.15
#     _, clamped = cv2.threshold(neg_text_only, 255, MAX_PIX_VAL, cv2.THRESH_TRUNC)
#     clamped_u8 = clamped.astype(np.uint8)
#     processed = cv2.adaptiveThreshold(clamped_u8, MAX_PIX_VAL, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)
#     return processed

# def preprocess_image(img):
#     if len(img.shape) == 3:
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     h = 96
#     ratio = img.shape[1] / img.shape[0]
#     w = int(h * ratio)
#     img = cv2.resize(img, (w, h), interpolation=cv2.INTER_AREA).astype(np.float32)
#     img = img[None, :, :]
#     pad_img = np.pad(img, ((0, 0), (0, h - img.shape[1]), (0, 2000 - img.shape[2])), mode='edge')
#     pad_img = np.expand_dims(pad_img, axis=0)
#     return pad_img

# def ctc_greedy_decoder(output):
#     output = np.squeeze(output)
#     pred_indices = np.argmax(output, axis=1)
#     decoded = []
#     prev = None
#     for idx in pred_indices:
#         if idx != prev and idx != 0:
#             decoded.append(symbol_map[idx - 1])
#         prev = idx
#     return ''.join(decoded)

# @app.route("/predict", methods=["POST"])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({"error": "No image uploaded"}), 400

#     file = request.files['image']
#     if file.filename == '':
#         return jsonify({"error": "Empty filename"}), 400

#     try:
#         filename = os.path.join(app.config['UPLOAD_FOLDER'], f"{uuid.uuid4().hex}.jpg")
#         file.save(filename)
#         pil_img = Image.open(filename).convert("RGB")
#         img_np = np.array(pil_img)
#         processed = preprocess_image(img_np)
#         result = compiled_model([processed])[output_layer]
#         text = ctc_greedy_decoder(result)
#         return jsonify({"recognized_text": text})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
#     app.run(debug=True)

from flask import Flask, request, jsonify
from skimage.filters.rank import entropy
from skimage.morphology import disk
import numpy as np
import cv2
import os
from openvino.runtime import Core
from PIL import Image
import uuid
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # This enables CORS for all routes
app.config['UPLOAD_FOLDER'] = 'uploads'

# Paths
model_xml = os.path.join("model", "handwritten-english-recognition-0001", "FP32", "handwritten-english-recognition-0001.xml")
symbol_txt = os.path.join("model", "handwritten-english-recognition-0001", "gnhk.txt")

# Load model
ie = Core()
model = ie.read_model(model=model_xml)
compiled_model = ie.compile_model(model=model, device_name="CPU")
output_layer = compiled_model.output(0)

# Load symbol map
with open(symbol_txt, "r", encoding="utf-8") as f:
    symbol_map = ''.join(line.rstrip("\n") for line in f)

# === Image Preprocessing ===

def binarize(img):
    entr = entropy(img, disk(5))
    MAX_ENTROPY = 8.0
    MAX_PIX_VAL = 255
    negative = 1 - (entr / MAX_ENTROPY)
    u8img = (negative * MAX_PIX_VAL).astype(np.uint8)
    _, mask = cv2.threshold(u8img, 0, MAX_PIX_VAL, cv2.THRESH_OTSU)
    masked = cv2.bitwise_and(img, img, mask=mask)
    kernel = np.ones((35, 35), np.uint8)
    background = cv2.dilate(masked, kernel, iterations=1)
    text_only = cv2.absdiff(img, background)
    neg_text_only = (MAX_PIX_VAL - text_only) * 1.15
    _, clamped = cv2.threshold(neg_text_only, 255, MAX_PIX_VAL, cv2.THRESH_TRUNC)
    clamped_u8 = clamped.astype(np.uint8)
    processed = cv2.adaptiveThreshold(clamped_u8, MAX_PIX_VAL, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)
    return processed

def preprocess_image(img):
    if len(img.shape) == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    h = 96
    ratio = img.shape[1] / img.shape[0]
    w = int(h * ratio)
    img = cv2.resize(img, (w, h), interpolation=cv2.INTER_AREA).astype(np.float32)
    img = img[None, :, :]
    pad_img = np.pad(img, ((0, 0), (0, h - img.shape[1]), (0, 2000 - img.shape[2])), mode='edge')
    pad_img = np.expand_dims(pad_img, axis=0)
    return pad_img

def ctc_greedy_decoder(output):
    output = np.squeeze(output)
    pred_indices = np.argmax(output, axis=1)
    decoded = []
    prev = None
    for idx in pred_indices:
        if idx != prev and idx != 0:
            decoded.append(symbol_map[idx-1])
        prev = idx
    return ''.join(decoded)

# === Flask Route ===

@app.route("/predict", methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    try:
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], f"{uuid.uuid4().hex}.jpg")
        file.save(filepath)

        pil_img = Image.open(filepath).convert("RGB")
        img = np.array(pil_img)

        # Binarize + Preprocess
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        bin_img = binarize(gray)
        processed = preprocess_image(bin_img)

        result = compiled_model([processed])[output_layer]
        text = ctc_greedy_decoder(result)

        return jsonify({"recognized_text": text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === Main ===

if __name__ == "__main__":
    app.run(debug=True)
