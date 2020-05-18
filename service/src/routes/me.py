"""
Defines the blueprint for the users
"""
from flasgger import swag_from
from flask import Blueprint
from flask.json import jsonify
from flask_restful import Api
from flask_jwt_extended import jwt_required

from repositories import UserRepository

ME_BLUEPRINT = Blueprint("me", __name__)

@ME_BLUEPRINT.route('/me', methods=['GET'])
@jwt_required
@swag_from("../swagger/me/GET.yml")
def me():
    try:
        id = 1
        """ Get user by id """
        user = UserRepository.getById(id)
        return jsonify({"user": user.serialize, "success": True})
    except:
        return {'message': 'Something went wrong'}
