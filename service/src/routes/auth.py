"""
Defines the blueprint for the auth
"""
import uuid
import datetime

from flasgger import swag_from
from flask import Blueprint, request
from flask.json import jsonify
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token, get_jwt_identity)

from repositories import AuthRepository, UserRepository

AUTH_BLUEPRINT = Blueprint("auth", __name__)

@AUTH_BLUEPRINT.route('/auth', methods=['POST'])
@swag_from("../swagger/auth/POST.yml")
def create():
    """ Create a auth """
    body = request.get_json()
    auth = AuthRepository.getByUsername(body["username"].lower())
    expires = datetime.timedelta(days=1)
    if not auth:
        pw_hash = generate_password_hash(body["password"], 10)
        auth = AuthRepository.create(
            body["username"].lower(), pw_hash
        )
        user = UserRepository.create(
            body["username"], None, None
        )
        expires = datetime.timedelta(days=1)
        # access_token = create_access_token(identity = { "username": auth.username, "id": auth.id }, expires_delta=expires)
        access_token = create_access_token(identity = { "username": auth.username, "id": auth.id })
        response = jsonify({"success": True, "access_token": access_token})
        response.status_code = 200
        return response
    validatePassword = check_password_hash(auth.password, body["password"])
    if not validatePassword:
        response = jsonify({"success": False, "message": "Invalid username or password"})
        response.status_code = 200
        return response
    
    access_token = create_access_token(identity = { "username": auth.username, "id": auth.id })
    AuthRepository.updateToken(id=auth.id, token=access_token)
    response = jsonify({"success": True, "access_token": access_token })
    response.status_code = 200
    return response
