from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from rapidfuzz import process

app = Flask(__name__)
CORS(app)
# Load medicines from CSV
df = pd.read_csv("medicine_dataset.csv")
medicine_list = df["Name"].dropna().unique().tolist()  # adjust column name

@app.route("/")
def home():
    return "Flask Autocomplete API with Kaggle Dataset ✅"

@app.route("/autocomplete", methods=["POST"])
def autocomplete():
    data = request.get_json()
    query = data.get("text", "")

    if not query:
        return jsonify({"suggestions": []})

    suggestions = process.extract(query, medicine_list, limit=5)
    matches = [s[0] for s in suggestions]

    return jsonify({"suggestions": matches})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
