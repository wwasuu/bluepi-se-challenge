"""
Defines the blueprint for the games
"""
from flask import Blueprint
from flask_restful import Api

from resources import GamesResource, GameResource


GAMES_BLUEPRINT = Blueprint("games", __name__)
Api(GAMES_BLUEPRINT).add_resource(
    GamesResource, "/games"
)

Api(GAMES_BLUEPRINT).add_resource(
    GameResource, "/games/<int:id>"
)
