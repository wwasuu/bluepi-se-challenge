"""
Defines the blueprint for the games
"""
from flasgger import swag_from
from flask import Blueprint, request
from flask.json import jsonify
from flask_jwt_extended import jwt_required

from repositories import GameRepository

LEADERBOARD_BLUEPRINT = Blueprint("leaderboard", __name__)

@LEADERBOARD_BLUEPRINT.route('/leaderboard', methods=['GET'])
@jwt_required
@swag_from("../swagger/leaderboard/GET.yml")
def get():
    """ Get leaderboard """
    args = request.args
    game = GameRepository.getTopScore(args["limit"])
    return jsonify({"game": [i.serialize for i in game], "success": True})