"""
Define the Game model
"""
import datetime

from . import db
from .abc import BaseModel, MetaBaseModel
from .user import User

def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return value.strftime("%Y-%m-%d %H:%M:%S")

class Game(db.Model, BaseModel, metaclass=MetaBaseModel):
    """ The Game model """

    __tablename__ = "game"

    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    uid = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    score = db.Column(db.Integer, nullable=True)
    time = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.relationship(User)

    # def __init__(id, uid, user_id, score, time, created_at, updated_at):
    #     """ Create a new User """
    #     self.id = id
    #     self.uid = uid
    #     self.user_id = user_id
    #     self.score = score
    #     self.time = time
    #     self.created_at = created_at
    #     self.updated_at = updated_at

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'uid': self.uid,
            'user_id': self.user_id,
            'score': self.score,
            'user': self.user.serialize,
            'time': self.time,
            'created_at': dump_datetime(self.created_at),
            'updated_at': dump_datetime(self.updated_at)
        }
