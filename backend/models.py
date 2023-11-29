from app import db
from sqlalchemy import func


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_username = db.Column(db.ForeignKey('user.username'), nullable=False)
    author = db.relationship('User')
    timestamp = db.Column(db.DateTime, server_default=func.now())
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    hall = db.Column(db.String, nullable=False)
    image_url = db.Column(db.ForeignKey('image.url'), nullable=False)
    image = db.relationship('Image')
    comments = db.relationship('Comment', cascade="all, delete")  # deletes comments when parent is deleted
    liked_users = db.relationship('User', secondary='post_liked_users', back_populates='liked_posts')

    def __repr__(self):
        return '<Post Title %r>' % self.id


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_post_id = db.Column(db.ForeignKey('post.id'), nullable=False)
    author_username = db.Column(db.ForeignKey('user.username'), nullable=False)
    author = db.relationship('User')
    timestamp = db.Column(db.DateTime, server_default=func.now())
    content = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<Comment content %r>' % self.content


class User(db.Model):
    username = db.Column(db.String(250), primary_key=True)
    password = db.Column(db.String(250), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=func.now())
    profile_image_url = db.Column(db.String, nullable=True)
    liked_posts = db.relationship('Post', secondary='post_liked_users', back_populates='liked_users')


class Image(db.Model):
    url = db.Column(db.String, primary_key=True)
    public_id = db.Column(db.String, nullable=False)


class PostLikedUsers(db.Model):
    post_id = db.Column(db.ForeignKey('post.id'), nullable=False, primary_key=True)
    username = db.Column(db.ForeignKey('user.username'), nullable=False, primary_key=True)
