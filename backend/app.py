from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import cloudinary.uploader
from dotenv import load_dotenv
import os

load_dotenv()
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
)

app = Flask(__name__)

# Set up the SQLAlchemy Database to be a local file 'desserts.db'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


from views import *
from models import *    # for db.create_all()

with app.app_context():
    db.create_all()
print("Running")
app.run(debug=True)