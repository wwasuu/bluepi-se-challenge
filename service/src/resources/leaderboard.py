"""
Define the REST verbs relative to the user
"""

import uuid
import json

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required)

from repositories import GameRepository

parser = reqparse.RequestParser()

class LeaderboardResource(Resource):
    """ Verbs relative to the leaderboard """
    
    @staticmethod
    @jwt_required
    def get():
        """ Get leaderboard """
        parser.add_argument("limit", type=int)
        args = parser.parse_args()
        game = GameRepository.getTopScore(args["limit"])
        return jsonify(game=[i.serialize for i in game])