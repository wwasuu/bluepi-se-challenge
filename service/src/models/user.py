"""
Define the User model
"""
import datetime

from . import db
from .abc import BaseModel, MetaBaseModel

def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return value.strftime("%Y-%m-%d %H:%M:%S")

class User(db.Model, BaseModel, metaclass=MetaBaseModel):
    """ The User model """
    
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    username = db.Column(db.String(50))
    best_score = db.Column(db.Integer, nullable=True)
    best_time = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # def __init__(id, username, best_score, best_time, created_at, updated_at):
    #     """ Create a new User """
    #     self.id = id
    #     self.username = username
    #     self.best_score = best_score
    #     self.best_time = best_time
    #     self.created_at = created_at
    #     self.updated_at = updated_at
        
    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           'id': self.id,
           'username': self.username,
           'best_score': self.best_score,
           'best_time': self.best_time,
           'created_at': dump_datetime(self.created_at),
           'updated_at': dump_datetime(self.updated_at)
       }