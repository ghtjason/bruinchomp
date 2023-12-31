from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import cloudinary.uploader
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_bcrypt import Bcrypt
from flask_cors import CORS

load_dotenv()
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
)

app = Flask(__name__)
CORS(app)

# setting up sqlalchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_COOKIE_SECURE"] = False
# app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = os.getenv('SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=168)

# bcrypt setup
bcrypt = Bcrypt(app)

# setting up flask-jwt-extended
jwt = JWTManager(app)

db = SQLAlchemy(app)

from views import *
from models import *  # for db.create_all()


with app.app_context():
    # db.drop_all() # uncomment if tables need to be recreated
    db.create_all()
    url = 'http://res.cloudinary.com/dvyw0j972/image/upload/v1701577834/i7yo9kigukeiiyhivz1e.jpg'
    if Image.query.get(url) is None:
        matt = dict()
        matt['public_id'] = 'i7yo9kigukeiiyhivz1e'
        matt['url'] = url
        matt_data = image_schema.load(matt)
        matt_image = Image(**matt_data)
        db.session.add(matt_image)
        db.session.commit()


