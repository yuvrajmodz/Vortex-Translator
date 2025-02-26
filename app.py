from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__, template_folder="VortexApplication")
CORS(app)

# ----------------------------------------------
# 𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 © 𝟮𝟬𝟮𝟱 𝗠𝗮𝘁𝗿𝗶𝘅𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿
# ----------------------------------------------

translator = Translator()

@app.route("/")
def home():
    return render_template("vortex.html")

@app.route("/translate")
def translate_text():
    from_lang = request.args.get("from")
    to_lang = request.args.get("to") 
    text = request.args.get("text")

    if not from_lang or not to_lang or not text:
        return "Missing required parameters: 'from', 'to', 'text'", 400

    try:
        translated = translator.translate(text, src=from_lang, dest=to_lang)
        return translated.text
    except Exception as e:
        return str(e), 500

if __name__ == "__main__":
    app.run(debug=True)
