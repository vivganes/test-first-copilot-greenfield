from flask import Blueprint, jsonify

user_management_bp = Blueprint("user_management", __name__)

@user_management_bp.route("/hello", methods=["GET"])
def hello_world():
    return jsonify({"message": "Hello, World!"})
