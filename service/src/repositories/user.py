""" Defines the User repository """

from models import User


class UserRepository:
    """ The repository for the user model """
    @staticmethod
    def create(username, best_score, best_time):
        """ Create a new user """
        user = User(username=username, best_score=best_score, best_time=best_time)

        return user.save()
    
    @staticmethod
    def get():
        """ Query all user """
        return User.query.all()
    
    @staticmethod
    def getById(id):
        """ Query user by id """
        return User.query.filter_by(id=id).first()
    
    @staticmethod
    def updateScore(id, score, time):
        """ Update user score """
        user = User.query.filter_by(id=id).first()
        user.best_score = score
        user.best_time = time
        return user.save()
        
