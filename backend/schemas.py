from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import *


class PostSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Post
