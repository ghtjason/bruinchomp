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
    image_public_id = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    comments = db.relationship('Comment')

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
    profile_image_public_id = db.Column(db.String, nullable=True)
    profile_image_url = db.Column(db.String, nullable=True)
