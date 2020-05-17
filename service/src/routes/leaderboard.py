"""
Defines the blueprint for the games
"""
from flask import Blueprint
from flask_restful import Api

from resources import LeaderboardResource

LEADERBOARD_BLUEPRINT = Blueprint("leaderboard", __name__)
Api(LEADERBOARD_BLUEPRINT).add_resource(
    LeaderboardResource, "/leaderboard"
)
