from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import *
from marshmallow import EXCLUDE


class PostSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        include_fk = True


class CommentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        include_fk = True

    # parent_post_id = fields.fields.Int(required=False)


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User


class ImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Image
        unknown = EXCLUDE
