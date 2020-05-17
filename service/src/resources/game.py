"""
Define the REST verbs relative to the games
"""

import uuid

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource, reqparse

from repositories import GameRepository, UserRepository
from flask_jwt_extended import (jwt_required, get_raw_jwt, get_jwt_identity)

parser = reqparse.RequestParser()


class GameResource(Resource):
    """ Verbs relative to the game """

    @staticmethod
    @jwt_required
    def put(id):
        """ Update a game """
        parser.add_argument("score", type=int)
        parser.add_argument("time", type=int)
        args = parser.parse_args()
        game = GameRepository.updateScore(id, args["score"], args["time"])
        print (game.user_id)
        user = UserRepository.updateScore(game.user_id, args["score"], args["time"])
        response = jsonify({"game": game.serialize})
        response.status_code = 200
        return response
