"""
Define the REST verbs relative to the games
"""

import uuid
import datetime

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource, reqparse
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token, get_jwt_identity)

parser = reqparse.RequestParser()

from repositories import AuthRepository, UserRepository

class AuthResource(Resource):
    """ Verbs relative to the auth """
    
    @staticmethod
    def post():
        """ Create a auth """
        parser.add_argument("username", type=str)
        parser.add_argument("password", type=str)
        args = parser.parse_args()
        auth = AuthRepository.getByUsername(args["username"].lower())
        expires = datetime.timedelta(days=1)
        if not auth:
            pw_hash = generate_password_hash(args["password"], 10)
            auth = AuthRepository.create(
                args["username"].lower(), pw_hash
            )
            user = UserRepository.create(
                args["username"], None, None
            )
            expires = datetime.timedelta(days=1)
            access_token = create_access_token(identity = { "username": auth.username, "id": auth.id }, expires_delta=expires)
            response = jsonify({"success": True, "auth": auth.json, "access_token": access_token})
            response.status_code = 200
            return response
        validatePassword = check_password_hash(auth.password, args["password"])
        if not validatePassword:
            response = jsonify({"success": False, "message": "Invalid username or password"})
            response.status_code = 200
            return response
        
        access_token = create_access_token(identity = { "username": auth.username, "id": auth.id }, expires_delta=expires)
        AuthRepository.updateToken(id=auth.id, token=access_token)
        response = jsonify({"success": True, "access_token": access_token })
        response.status_code = 200
        return response
    
    @staticmethod
    def put():
        """ Update a auth """
        
        response = jsonify({"auth": "auth.json"})
        response.status_code = 200
        return response