"""
Defines the blueprint for the games
"""
from flasgger import swag_from
from flask import Blueprint, request
from flask.json import jsonify
from flask_restful import Api
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid

from repositories import GameRepository, UserRepository

GAMES_BLUEPRINT = Blueprint("games", __name__)

@GAMES_BLUEPRINT.route('/games', methods=['POST'])
@jwt_required
@swag_from("../swagger/games/POST.yml")
def create():
    """ Create a game """
    
    current_user = get_jwt_identity()
    game = GameRepository.create(
        uuid.uuid4(), current_user["id"]
    )
    response = jsonify({"game": game.serialize, "success": True})
    response.status_code = 201
    return response

@GAMES_BLUEPRINT.route('/games/<int:id>', methods=['PUT'])
@jwt_required
@swag_from("../swagger/games/PUT.yml")
def update(id):
    """ Update a game """
    body = request.get_json()
    game = GameRepository.updateScore(id, body["score"], body["time"])
    user = UserRepository.updateScore(game.user_id, body["score"], body["time"])
    response = jsonify({"game": game.serialize, "success": True})
    response.status_code = 200
    return response


