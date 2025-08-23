from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes


# Path to Tesseract executable
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"})

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Empty file"})

    try:
        img = Image.open(io.BytesIO(file.read()))
        extracted_text = pytesseract.image_to_string(img)
        return jsonify({"text": extracted_text})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
