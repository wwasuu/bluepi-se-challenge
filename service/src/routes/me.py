"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask.json import jsonify
from flask_restful import Api
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity)

# from resources import MeResource
from repositories import UserRepository

ME_BLUEPRINT = Blueprint("me", __name__)

@ME_BLUEPRINT.route('/me')
@jwt_required
def get():
    try:
        id = 1
        """ Get user by id """
        user = UserRepository.getById(id)
        return jsonify({"user": user.serialize})
    except:
        return {'message': 'Something went wrong'}

# Api(ME_BLUEPRINT).add_resource(
#     MeResource, "/me")
