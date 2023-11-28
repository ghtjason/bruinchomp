from app import db
from sqlalchemy import func


class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=func.now())
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    hall = db.Column(db.String, nullable=False)
    image_public_id = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<Post Title %r>' % self.id
