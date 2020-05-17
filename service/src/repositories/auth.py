""" Defines the Game repository """

from models import Auth


class AuthRepository:
    """ The repository for the auth model """
    @staticmethod
    def create(username, password):
        """ Create a new auth """
        auth = Auth(username=username, password=password)

        return auth.save()
    
    @staticmethod
    def updateToken(id, token):
        """ Update token identify by id"""
        auth = Auth.query.filter_by(id=id).first()
        auth.token = token
        return auth.save()
    
    @staticmethod
    def getByUsername(username):
        """ Query user by username"""
        return Auth.query.filter_by(username=username).first()
    
