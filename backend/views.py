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
comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
user_schema = UserSchema()
image_schema = ImageSchema()


@app.route('/posts', methods=['GET'])
@jwt_required(optional=True)
def list_posts():
    try:
        posts = Post.query.all()
        user = User.query.get(get_jwt_identity())
        posts_schema.context = {"user": user}
        return posts_schema.dump(posts)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<filter_by>/<key>', methods=['GET'])
@jwt_required(optional=True)
def list_posts_contains(filter_by, key):
    try:
        user = User.query.get(get_jwt_identity())
        posts_schema.context = {"user": user}
        if filter_by == "user":
            posts = Post.query.filter_by(author_username=key).all()
        elif filter_by == "title":
            posts = Post.query.filter_by(title=key).all()
        elif filter_by == "hall":
            posts = Post.query.filter_by(hall=key).all()
        elif filter_by == "meal-period":
            posts = Post.query.filter_by(meal_period=key).all()
        else:
            posts = Post.query.all()
        return posts_schema.dump(posts)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/search', methods=['GET'])
@jwt_required(optional=True)
def search_posts():
    try:
        user = User.query.get(get_jwt_identity())
        posts_schema.context = {"user": user}
        url_params = request.args
        keyword = url_params.get('key', None)
        user = url_params.get('user', None)
        hall = url_params.get('hall', None)
        meal = url_params.get('meal', None)
        order = url_params.get('order', 'recent')
        post_query = None
        if keyword:
            keyword = keyword.replace("-", " ")
            regex = '\\m' + keyword.lower() + '\\M'
            user_posts = Post.query.filter(func.lower(Post.author_username).op('~')(regex))
            content_posts = Post.query.filter(func.lower(Post.content).op('~')(regex))
            hall_posts = Post.query.filter(func.lower(Post.hall).op('~')(regex))
            title_posts = Post.query.filter(func.lower(Post.title).op('~')(regex))
            meal_posts = Post.query.filter(func.lower(Post.meal_period).op('~')(regex))
            post_query = user_posts.union(content_posts, hall_posts, title_posts, meal_posts)
        if user:
            user = user.replace("-", " ")
            post_query = post_query.filter(
                func.lower(Post.author_username) == user.lower()) if post_query else Post.query.filter(
                func.lower(Post.author_username) == user.lower())
        if hall:
            hall = hall.replace("-", " ")
            post_query = post_query.filter(func.lower(Post.hall) == hall.lower()) if post_query else Post.query.filter(
                func.lower(Post.hall) == hall.lower())
        if meal:
            meal = meal.replace("-", " ")
            post_query = post_query.filter(
                func.lower(Post.meal_period) == meal.lower()) if post_query else Post.query.filter(
                func.lower(Post.meal_period) == meal.lower())
        if order == "popular":
            posts = post_query.all()
            # TODO: come up with a popularity sort
        elif order == "relevance":
            posts = post_query.all()
            # TODO: come up with a relevance sort
        else:
            posts = post_query.order_by(Post.timestamp.desc()).all()
        return posts_schema.dump(posts)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    try:
        json_data = request.get_json()
        data = post_schema.load(json_data)
        data['author_username'] = get_jwt_identity()
        post = Post(**data)
        db.session.add(post)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    try:
        post_to_delete = Post.query.get(post_id)
        if post_to_delete is None:
            raise Exception(f'No post found with id \'{post_id}\'')
        if post_to_delete.author_username != get_jwt_identity():
            raise Exception(f'Not authorized to delete post by \'{post_to_delete.author_username}\'')
        associated_image = post_to_delete.image
        db.session.delete(post_to_delete)  # deletes post
        # if image has no more associated posts, should generally be true, == 1 bc db not yet committed
        if len(associated_image.posts) == 1:
            image_public_id = post_to_delete.image.public_id
            cloudinary.uploader.destroy(image_public_id)  # delete image inside cloudinary
            db.session.delete(post_to_delete.image)
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
        return image_schema.dump(image)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/likes', methods=['POST'])
@jwt_required()
def like_post(post_id):
    try:
        post = Post.query.get(post_id)
        if post is None:
            raise Exception(f'No post found with id \'{post_id}\'')
        user = User.query.get(get_jwt_identity())
        if user in post.liked_users:
            raise Exception(f'User \'{user.username}\' has already liked the post')
        post.liked_users.append(user)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/likes', methods=['DELETE'])
@jwt_required()
def unlike_post(post_id):
    try:
        post = Post.query.get(post_id)
        if post is None:
            raise Exception(f'No post found with id \'{post_id}\'')
        user = User.query.get(get_jwt_identity())
        if user not in post.liked_users:
            raise Exception(f'User \'{user.username}\' has not liked the post')
        post.liked_users.remove(user)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/comments', methods=['GET'])
def list_comments(post_id):
    try:
        post = Post.query.get(post_id)
        if post is None:
            raise Exception(f'No post found with id \'{post_id}\'')
        comments = post.comments
        return comments_schema.dump(comments)
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/comments', methods=['POST'])
@jwt_required()
def create_comment(post_id):
    try:
        post_exists = db.session.query(db.exists().where(Post.id == post_id)).scalar()
        if not post_exists:
            raise Exception(f'No post found with id \'{post_id}\'')
        json_data = request.get_json()
        data = comment_schema.load(json_data)
        data['parent_post_id'] = post_id  # populates foreign key, which also populates relationship in post
        data['author_username'] = get_jwt_identity()
        comment = Comment(**data)
        db.session.add(comment)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"error: {e}"


@app.route('/posts/<int:post_id>/comments/<int:comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(post_id, comment_id):
    try:
        comment_to_delete = Comment.query.get(comment_id)
        if comment_to_delete is None:
            raise Exception(f'No comment found with id \'{comment_id}\' in post \'{post_id}\'')
        if comment_to_delete.author_username != get_jwt_identity():
            raise Exception(f'Not authorized to delete comment by \'{comment_to_delete.author_username}\'')
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


@app.route('/users/', methods=['GET'])
@jwt_required()
def get_identity():
    try:
        user = User.query.get(get_jwt_identity())
        if user is None:
            raise Exception(f'No user found with username \'{username}\'')
        return user_schema.dump(user)
    except Exception as e:
        return f"error: {e}"


@app.route('/users/<string:username>', methods=['GET'])
def display_user(username):
    try:
        user = User.query.get(username)
        if user is None:
            raise Exception(f'No user found with username \'{username}\'')
        return user_schema.dump(user)
    except Exception as e:
        return f"error: {e}"


# login
@app.route('/login', methods=['POST'])
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

# delete user: not working because posts still reference user
# @app.route('/users/<string:username>', methods=['DELETE'])
# def delete_user(username):
#     try:
#         user_to_delete = User.query.get(username)
#         if user_to_delete is None:
#             raise Exception(f'No user found with id \'{user_to_delete}\'')
#         db.session.delete(user_to_delete)  # deletes user
#         db.session.commit()
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"error: {e}"
