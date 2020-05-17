from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .game import Game
from .auth import Auth