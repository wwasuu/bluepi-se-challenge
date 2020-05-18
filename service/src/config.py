import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = os.getenv("ENVIRONEMENT") == "DEV"
PORT = int(os.getenv("APPLICATION_PORT", "8080"))
APPLICATION_ROOT = os.getenv("APPLICATION_APPLICATION_ROOT", "/api")
SQLALCHEMY_TRACK_MODIFICATIONS = False
DB_URI = os.getenv("DB_URI")
SECRET_KEY = os.getenv("SECRET_KEY")
