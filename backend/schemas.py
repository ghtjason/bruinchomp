from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow_sqlalchemy import fields

from models import *


class PostSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Post


class CommentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
    parent_post_id = fields.fields.Int(required=False)
