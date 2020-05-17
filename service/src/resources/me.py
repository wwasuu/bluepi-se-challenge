"""
Define the REST verbs relative to the user
"""

import uuid
import json

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity)

from repositories import UserRepository

parser = reqparse.RequestParser()

class MeResource(Resource):
    """ Verbs relative to the me """
        
    @staticmethod
    @jwt_required
    def get():
        try:
            id = 1
            """ Get user by id """
            user = UserRepository.getById(id)
            return jsonify({"user": user.serialize})
        except:
            return {'message': 'Something went wrong'}, 500
        