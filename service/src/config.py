import os

DEBUG = os.getenv("ENVIRONEMENT") == "DEV"
PORT = int(os.getenv("APPLICATION_PORT", "8080"))
APPLICATION_ROOT = os.getenv("APPLICATION_APPLICATION_ROOT", "/api")
SQLALCHEMY_TRACK_MODIFICATIONS = False
DB_URI = "mysql://root:b15d873e209b5c8b2f7ec7c5dd4059c0926d8e539ed5e610@165.22.109.7:3306/blue_pi"
SECRET_KEY = "bluepi-game"
