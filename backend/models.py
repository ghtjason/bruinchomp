from app import db
from sqlalchemy import func


class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=func.now())
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    hall = db.Column(db.String, nullable=False)
    image_public_id = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    comments = db.relationship('Comment', backref='post')

    def __repr__(self):
        return '<Post Title %r>' % self.id


class Comment(db.Model):
    comment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    parent_post_id = db.Column(db.Integer, db.ForeignKey('post.post_id'))
    author = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=func.now())
    content = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<Comment content %r>' % self.content
