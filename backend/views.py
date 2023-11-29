from flask import jsonify, request
from models import *
from schemas import *
from app import *
import cloudinary.uploader
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_bcrypt import Bcrypt

post_schema = PostSchema()
posts_schema = PostSchema(many=True)
comment_schema = CommentSchema(dump_only=['parent_post_id'])
comments_schema = CommentSchema(many=True)
user_schema = UserSchema(load_only=['password'])
image_schema = ImageSchema(load_only=['public_id'])


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
        image_public_id = post_to_delete.image.public_id
        cloudinary.uploader.destroy(image_public_id)  # delete image inside cloudinary
        db.session.delete(post_to_delete.image)
        db.session.delete(post_to_delete)  # deletes post
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
        data = image_schema.load(upload_result)
        image = Image(**data)
        db.session.add(image)
        db.session.commit()
        return image_schema.dumps(image)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/comments', methods=['GET'])
def list_comments(post_id):
    try:
        post = Post.query.get(post_id)
        if post is None:
            raise Exception(f'No post found with id \'{post_id}\'')
        comments = post.comments
        return comments_schema.dumps(comments)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/comments', methods=['POST'])
def create_comment(post_id):
    try:
        post_exists = db.session.query(db.exists().where(Post.id == post_id)).scalar()
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


# registering new user
@app.route('/users', methods=['POST'])
def register_user():
    try:
        json_data = request.get_json()
        data = user_schema.load(json_data)
        username = data['username']
        user_exists = db.session.query(db.exists().where(User.username == username)).scalar()
        if user_exists:
            raise Exception(f'User with username \'{username}\' already exists')
        password = data['password']
        hashed_pass = bcrypt.generate_password_hash(password).decode('utf-8')
        data['password'] = hashed_pass
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/users/<string:username>', methods=['GET'])
def display_user(username):
    try:
        user = User.query.get(username)
        if user is None:
            raise Exception(f'No user found with username \'{username}\'')
        return user_schema.dumps(user)
    except Exception as e:
        return f"error: {e}"


# login
@app.route('/sessions', methods=['POST'])
def login_user():
    try:
        json_data = request.get_json()
        data = user_schema.load(json_data)
        username = data['username']
        user = User.query.get(username)
        if user is None:
            raise Exception(f'No user found with username \'{username}\'')
        password = data['password']
        is_valid = bcrypt.check_password_hash(user.password, password)
        if not is_valid:
            raise Exception(f'Incorrect password for user \'{username}\'')
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    except Exception as e:
        return f"error: {e}"


# @app.route('/posts/<int:post_id>/likes', methods=['POST'])
# def delete_post(post_id):
#     try:
#         post_to_delete = Post.query.get(post_id)
#         if post_to_delete is None:
#             raise Exception(f'No post found with id \'{post_id}\'')
#         image_public_id = post_to_delete.image.public_id
#         cloudinary.uploader.destroy(image_public_id)  # delete image inside cloudinary
#         db.session.delete(post_to_delete.image)
#         db.session.delete(post_to_delete)  # deletes post
#         db.session.commit()
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"error: {e}"