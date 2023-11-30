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
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = os.getenv('SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=48)

# bcrypt setup
bcrypt = Bcrypt(app)

# setting up flask-jwt-extended
jwt = JWTManager(app)

db = SQLAlchemy(app)

from views import *
from models import *  # for db.create_all()


with app.app_context():
    db.drop_all()
    db.create_all()
