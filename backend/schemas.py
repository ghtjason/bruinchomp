from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from models import *
from marshmallow import EXCLUDE, fields, validate

DINING_HALLS = ['Bruin Plate', 'De Neve', 'Epicuria']
MEAL_PERIODS = ['Breakfast', 'Lunch', 'Dinner']


class PostSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        include_fk = True

    author_username = auto_field(dump_only=True)
    hall = auto_field(validate=validate.OneOf(DINING_HALLS))
    meal_period = auto_field(validate=validate.OneOf(MEAL_PERIODS))
    like_count = fields.Method('get_like_count')
    is_liked = fields.Method('get_is_liked')
    author_profile_image_url = fields.Method('get_profile_image_url')

    @staticmethod
    def get_like_count(obj):
        return len(obj.liked_users)

    def get_is_liked(self, obj):
        if self.context["user"] is None:
            return False
        return self.context["user"] in obj.liked_users

    @staticmethod
    def get_profile_image_url(obj):
        return obj.author.profile_image_url


class CommentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        include_fk = True

    parent_post_id = auto_field(dump_only=True)
    author_username = auto_field(dump_only=True)
    author_profile_image_url = fields.Method('get_profile_image_url')

    @staticmethod
    def get_profile_image_url(obj):
        return obj.author.profile_image_url


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        include_fk = True
        model = User

    username = auto_field(validate=[validate.ContainsNoneOf(' '), validate.Length(1, 20)])
    password = auto_field(load_only=True)


class ImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Image
        unknown = EXCLUDE

    public_id = auto_field(load_only=True)


class MessageSchema(SQLAlchemyAutoSchema):
    class Meta:
        include_fk = True
        model = Message

    sender_username = auto_field(dump_only=True)
