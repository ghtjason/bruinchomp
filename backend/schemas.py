from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow_sqlalchemy import fields

from models import *


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
