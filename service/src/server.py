from flasgger import Swagger
from flask import Flask, jsonify
from flask.blueprints import Blueprint
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required
from flask_cors import CORS

import config
import routes
from models import db

server = Flask(__name__)

server.config["SWAGGER"] = {
    "swagger_version": "2.0",
    "title": "Application",
    "specs": [
        {
            "version": "0.0.1",
            "title": "Application",
            "endpoint": "spec",
            "route": "/application/spec",
            "rule_filter": lambda rule: True,  # all in
        }
    ],
    "static_url_path": "/apidocs",
}

Swagger(server)
bcrypt = Bcrypt(server)
CORS(server)

server.config['JWT_SECRET_KEY'] = 'bluepi-game'
server.debug = config.DEBUG
server.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:b15d873e209b5c8b2f7ec7c5dd4059c0926d8e539ed5e610@165.22.109.7:3306/blue_pi"
server.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS
server.config['PROPOGATE_EXCEPTIONS'] = True
db.init_app(server)
db.app = server

jwt = JWTManager(server)

@jwt.expired_token_loader
def my_expired_token_callback(expired_token):
    token_type = expired_token['type']
    return jsonify({
        "status": 401,
        "msg": "expired token"
    }), 401
    
@jwt.invalid_token_loader
def my_invalid_token_callback(invalid_token):
    token_type = expired_token['type']
    return jsonify({
        "status": 422,
        "msg": "invalid token"
    }), 422


for blueprint in vars(routes).values():
    if isinstance(blueprint, Blueprint):
        server.register_blueprint(blueprint, url_prefix=config.APPLICATION_ROOT)

if __name__ == '__main__':
    db.create_all()
    server.run(port=config.PORT)