from app import db
from sqlalchemy import func


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_username = db.Column(db.ForeignKey('user.username'), nullable=False)
    author = db.relationship('User', back_populates='authored_posts')
    timestamp = db.Column(db.DateTime, server_default=func.now())
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    hall = db.Column(db.String, nullable=False)
    meal_period = db.Column(db.String, nullable=False)
    # post is child of image because foreign key? not sure how else to do this
    image_url = db.Column(db.ForeignKey('image.url'), nullable=False)
    image = db.relationship('Image', back_populates='posts')
    comments = db.relationship('Comment', back_populates='parent_post', cascade='all, delete')
    liked_users = db.relationship('User', secondary='post_liked_users', back_populates='liked_posts')

    def __repr__(self):
        return '<Post Title %r>' % self.title


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_post = db.relationship('Post', back_populates='comments')
    parent_post_id = db.Column(db.ForeignKey('post.id'), nullable=False)
    author_username = db.Column(db.ForeignKey('user.username'), nullable=False)
    author = db.relationship('User', back_populates='authored_comments')
    timestamp = db.Column(db.DateTime, server_default=func.now())
    content = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<Comment content %r>' % self.content


class User(db.Model):
    username = db.Column(db.String(250), primary_key=True)
    password = db.Column(db.String(250), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=func.now())
    profile_image_url = db.Column(db.ForeignKey('image.url'),
                                  server_default='http://res.cloudinary.com/dvyw0j972/image/upload/v1701577834/i7yo9kigukeiiyhivz1e.jpg')
    profile_image = db.relationship('Image', back_populates='users')
    authored_posts = db.relationship('Post', back_populates='author', cascade='all, delete')
    authored_comments = db.relationship('Comment', back_populates='author', cascade='all, delete')
    liked_posts = db.relationship('Post', secondary='post_liked_users', back_populates='liked_users')
    bio = db.Column(db.String, nullable=True)
    sent_msgs = db.relationship('Message', foreign_keys='Message.sender_username', back_populates='sender')
    received_msgs = db.relationship('Message', foreign_keys='Message.recipient_username', back_populates='recipient')


class Image(db.Model):
    url = db.Column(db.String, primary_key=True)
    public_id = db.Column(db.String, nullable=False)
    posts = db.relationship('Post', back_populates='image')
    users = db.relationship('User', back_populates='profile_image')


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, server_default=func.now())
    sender_username = db.Column(db.ForeignKey('user.username'), nullable=False)
    sender = db.relationship('User', back_populates='sent_msgs', foreign_keys=[sender_username])
    recipient_username = db.Column(db.ForeignKey('user.username'), nullable=False)
    recipient = db.relationship('User', back_populates='received_msgs', foreign_keys=[recipient_username])
    content = db.Column(db.String, nullable=False)


post_liked_users = db.Table(
    'post_liked_users',
    db.Column('post_id', db.ForeignKey('post.id'), primary_key=True),
    db.Column('username', db.ForeignKey('user.username'), primary_key=True)
)
