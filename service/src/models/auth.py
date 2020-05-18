"""
Define the Auth model
"""
import datetime

from . import db
from .abc import BaseModel, MetaBaseModel

def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return value.strftime("%Y-%m-%d %H:%M:%S")

class Auth(db.Model, BaseModel, metaclass=MetaBaseModel):
    """ The Auth model """

    __tablename__ = "auth"

    id = db.Column(db.Integer, primary_key=True, auto_increment=True)    
    username = db.Column(db.String(50))
    password = db.Column(db.Text)
    token = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # def __init__(id, username, password, token, created_at, updated_at):
    #     """ Create a new Auth """
    #     self.id = id
    #     self.username = username
    #     self.password = password
    #     self.token = token
    #     self.created_at = created_at
    #     self.updated_at = updated_at

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'token': self.token,
            'created_at': dump_datetime(self.created_at),
            'updated_at': dump_datetime(self.updated_at)
        }
