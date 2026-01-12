from flask import Blueprint, request, jsonify, current_app
from src.api.user_registration_service import UserRegistrationService, UserDTO
from src.api.user_repository import UserRepository
from src.api.address_repository import AddressRepository
from src.api.password_hasher import PasswordHasher
from src.api.email_verification_service import EmailVerificationService
from src.api.email_service import EmailService

user_management_bp = Blueprint("user_management", __name__)

@user_management_bp.route("/hello", methods=["GET"])
def hello_world():
    return jsonify({"message": "Hello, World!"})

@user_management_bp.route("/api/v1/users/register", methods=["POST"])
def register_user():
    data = request.get_json()
    user_dto = UserDTO.from_dict(data)
    db_session = current_app.config.get("DB_SESSION")
    service = UserRegistrationService(
        user_repo=UserRepository(db_session),
        address_repo=AddressRepository(db_session),
        password_hasher=PasswordHasher(),
        email_verification_service=EmailVerificationService(),
        email_service=EmailService()
    )
    user = service.register_user(user_dto)
    response = {
        "message": "Please check your email to verify your account",
        "emailVerified": False,
        "role": "Customer",
        "status": user.status,
        "userId": user.id
    }
    return jsonify(response), 201
