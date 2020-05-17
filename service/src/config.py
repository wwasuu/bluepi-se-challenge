import os

DEBUG = os.getenv("ENVIRONEMENT") == "DEV"
PORT = int(os.getenv("APPLICATION_PORT", "8080"))
APPLICATION_ROOT = os.getenv("APPLICATION_APPLICATION_ROOT", "/api")
SQLALCHEMY_TRACK_MODIFICATIONS = False

# DB_URI = "postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s" % POSTGRES