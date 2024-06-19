"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask_cors import CORS
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager,create_access_token,get_jwt_identity,jwt_required)
from api.utils import APIException, generate_sitemap
from api.models import db,User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)



db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY']= "secret-key"
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
bcrypt = Bcrypt(app)
setup_admin(app)
setup_commands(app)
jwt= JWTManager(app)



app.register_blueprint(api, url_prefix='/api')


@app.route('/login',methods=['POST'])
def user_loguin():
    user=User()
    email = request.json.get('email')
    password = request.json.get('password')
    if email is not None:
        user= User.query.filter_by(email=email).first()
        if user is not None:
            is_valid= bcrypt.check_password_hash(user.password,password)
            if is_valid:
                access_token= create_access_token(identity=email)
                return jsonify({
                    "access_token": access_token,
                }),200
            else:
                return jsonify({
                    "msg":"credenciales invalidas"
                }),400
        else: 
            return jsonify({
                "msg":"usuario no existe"
            }),400

    else:   
        return jsonify({
            "msg": "email no existe"
        }),400

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  
    return response

@app.route("/autvalidation",methods=['GET'])
@jwt_required()
def aut_required():
    return jsonify({"msg":"aut ok"}),200

@app.route('/register', methods=['POST'])
def user_register():
    email= request.json.get("email")
    if email is not None:
        useremail = User.query.filter_by(email=email).first()
        if useremail is not None:
            return jsonify({
                "msg":"Este usuario ya existe"
                }),400      
        else:
            user=User()
            password= request.json.get("password")
            password_hash= bcrypt.generate_password_hash(password).decode('utf-8')
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



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
