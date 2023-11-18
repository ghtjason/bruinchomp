import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app  # Initialize Flask App

app = Flask(__name__)  # Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
posts_ref = db.collection('posts')


@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON
        all_posts : Return all documents    """
    try:
        all_posts = [doc.to_dict() for doc in posts_ref.stream()]
        print(all_posts)
        return jsonify(all_posts), 200
    except Exception as e:
        return f"An Error Occured: {e}"


# Running app
if __name__ == '__main__':
    app.run(debug=True)
