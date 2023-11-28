from flask import jsonify, request
from models import *
from schemas import *
from app import *
import cloudinary.uploader

post_schema = PostSchema()
posts_schema = PostSchema(many=True)


@app.route('/posts', methods=['GET'])
def list_posts():
    try:
        posts = Post.query.all()
        return posts_schema.dump(posts)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts', methods=['POST'])
def create_post():
    try:
        json_data = request.get_json()
        data = post_schema.load(json_data)
        post = Post(**data)
        db.session.add(post)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    try:
        post_to_delete = Post.query.get(post_id)
        if post_to_delete is None:
            raise Exception(f'No post found with id \'{post_id}\'')
        image_public_id = post_to_delete.image_public_id
        cloudinary.uploader.destroy(image_public_id)  # delete image inside cloudinary
        db.session.delete(post_to_delete)  # deletes post inside firebase
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/image', methods=['POST'])
def upload_image():
    try:
        image_to_upload = request.files['file']
        if not image_to_upload:
            raise Exception("no file provided")
        upload_result = cloudinary.uploader.upload(image_to_upload, allowed_formats=['png', 'jpg', 'jpeg'])
        return jsonify(upload_result)
    except Exception as e:
        return f"error: {e}"
