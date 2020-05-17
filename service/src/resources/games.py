"""
Define the REST verbs relative to the games
"""

import uuid

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import GameRepository
from flask_jwt_extended import (jwt_required, get_raw_jwt, get_jwt_identity)

class GamesResource(Resource):
    """ Verbs relative to the games """

    @staticmethod
    @jwt_required
    def post():
        """ Create a game """
        
        current_user = get_jwt_identity()
        game = GameRepository.create(
            uuid.uuid4(), current_user["id"]
        )
        response = jsonify({"game": game.serialize})
        response.status_code = 201
        return response
    