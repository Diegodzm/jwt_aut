"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
bcrypt=Bcrypt()

@api.route('/prueba', methods=['GET'])
def prueba():
    return jsonify({"msg":"prueba "})


@api.route('/register', methods=['POST'])
def user_register():
    email= request.json.get('email')
    if email is not None:
        useremail = User.query.filter_by(email=email).first()
        if useremail is not None:
            return jsonify({
                "msg":"Este usuario ya existe"
                }),400      
        else:
            user=User()
            password= request.json.get('password')
            password_hash= bcrypt.generate_password_hash(password)
            user.password =password_hash
            user.email= email
            db.session.add(user)
            db.session.commit()

            return jsonify({
                "msg":"user created"
            }), 200

    else:
        return jsonify({
            "msg": "email is required"
        }),400

