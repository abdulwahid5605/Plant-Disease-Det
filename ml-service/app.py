from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import json

app = Flask(__name__)
CORS(app)

# Load SavedModel
model = tf.saved_model.load("plant_disease_cnn_savedmodel")
infer = model.signatures["serving_default"]

# Load class names
with open("class_names.json", "r") as f:
    CLASS_NAMES = json.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]

        img = Image.open(file.stream).convert("RGB").resize((224, 224))
        img = np.array(img) / 255.0
        img = np.expand_dims(img, axis=0).astype(np.float32)

        # 🔥 Correct inference for SavedModel
        outputs = infer(tf.constant(img))
        preds = list(outputs.values())[0].numpy()

        idx = int(np.argmax(preds))
        confidence = float(preds[0][idx]) * 100

        return jsonify({
            "disease": CLASS_NAMES[idx],
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        print("🔥 FLASK ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
