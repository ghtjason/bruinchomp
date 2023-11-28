from flask import jsonify, request
from models import *
from schemas import *
from app import *
import cloudinary.uploader

post_schema = PostSchema()
posts_schema = PostSchema(many=True)
comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)


@app.route('/posts', methods=['GET'])
def list_posts():
    try:
        posts = Post.query.all()
        return posts_schema.dumps(posts)
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


@app.route('/posts/<int:post_id>/comments', methods=['GET'])
def list_comments(post_id):
    try:
        post = Post.query.get(post_id)
        comments = post.comments
        return comments_schema.dumps(comments)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/comments', methods=['POST'])
def create_comment(post_id):
    try:
        post_exists = db.session.query(db.exists().where(Post.post_id == post_id)).scalar()
        if not post_exists:
            raise Exception(f'No post found with id \'{post_id}\'')
        json_data = request.get_json()
        data = comment_schema.load(json_data)
        data['parent_post_id'] = post_id
        comment = Comment(**data)
        db.session.add(comment)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(post_id, comment_id):
    try:
        comment_to_delete = Comment.query.get(comment_id)
        if comment_to_delete is None:
            raise Exception(f'No comment found with id \'{comment_id}\' in post \'{post_id}\'')
        db.session.delete(comment_to_delete)  # deletes post inside firebase
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"
