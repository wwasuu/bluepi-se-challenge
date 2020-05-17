"""
Defines the blueprint for the auth
"""
from flask import Blueprint
from flask_restful import Api

from resources import AuthResource

AUTH_BLUEPRINT = Blueprint("auth", __name__)
Api(AUTH_BLUEPRINT).add_resource(
    AuthResource, "/auth"
)
