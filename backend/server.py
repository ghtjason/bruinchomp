import os
import cloudinary.uploader
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app  # Initialize Flask App
from dotenv import load_dotenv

load_dotenv()
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
)

app = Flask(__name__)  # Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
posts_ref = db.collection('posts')


@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        image_to_upload = request.files['file']
        if not image_to_upload:
            raise Exception("no file provided")
        upload_result = cloudinary.uploader.upload(image_to_upload, allowed_formats=['png', 'jpg', 'jpeg'])
        return jsonify(upload_result)
    except Exception as e:
        return f"error: {e}"


@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON
        all_posts : Return all documents    """
    try:
        all_posts = [doc.to_dict() for doc in posts_ref.stream()]
        return jsonify(all_posts), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. {
    "description": "testid",
    "image": "nope.lol",
    "title": "newthingy",
    "hall": "bplate"
    "user": "me"
}
    """
    try:
        doc_ref = posts_ref.document()
        doc_ref.set(request.json)
        doc_ref.update({"id": doc_ref.id})  # set id field to auto-generated firebase id
        doc_ref.update({"date": firestore.firestore.SERVER_TIMESTAMP})
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/delete', methods=['DELETE'])
def delete():
    try:
        doc_id = request.json["id"]
        posts_ref.document(doc_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


# Running app
if __name__ == '__main__':
    app.run(debug=True)
