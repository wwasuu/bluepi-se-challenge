""" Defines the Game repository """

from models import Game, User


class GameRepository:
    """ The repository for the game model """
    @staticmethod
    def create(uid, user_id):
        """ Create a new user """
        game = Game(uid=uid, user_id=user_id)

        return game.save()
    
    @staticmethod
    def updateScore(id, score, time):
        """ Update token identify by id"""
        game = Game.query.filter_by(id=id).first()
        game.score = score
        game.time = time
        return game.save()
    
    @staticmethod
    def getTopScore(limit):
        """ Get Top High Score """
        return Game.query.join(User, Game.user_id==User.id).filter(Game.score.isnot(None)).filter(Game.time.isnot(None)).order_by(Game.score).order_by(Game.time).limit(limit).all()

    
