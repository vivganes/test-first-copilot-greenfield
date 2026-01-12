"""
UserRegistrationService implementation for user registration logic
"""
from src.api.user_dto import UserDTO
from src.api.user_repository import User, UserRepository
from src.api.address_repository import Address, AddressRepository

class UserRegistrationService:
    def __init__(self, user_repo, address_repo, password_hasher, email_verification_service, email_service):
        self.user_repo = user_repo
        self.address_repo = address_repo
        self.password_hasher = password_hasher
        self.email_verification_service = email_verification_service
        self.email_service = email_service

    def register_user(self, user_dto: UserDTO):
        # Hash password
        hashed_password = self.password_hasher.hash(user_dto.password)
        # Create user
        user = User(
            email=user_dto.email,
            name=user_dto.name,
            password_hash=hashed_password,
            phone_number=user_dto.phone_number
        )
        user = self.user_repo.create_user(user)
        # Create address
        address_data = user_dto.address
        address = Address(
            user_id=user.id,
            type=address_data.get("type"),
            line1=address_data.get("line1"),
            line2=address_data.get("line2"),
            city=address_data.get("city"),
            state=address_data.get("state"),
            postal_code=address_data.get("postalCode"),
            country=address_data.get("country"),
            is_default=address_data.get("isDefault", True),
            phone_number=address_data.get("phoneNumber")
        )
        self.address_repo.create_address(address)
        # Generate verification token
        token = self.email_verification_service.generate_token(user)
        # Send verification email
        self.email_service.send_verification_email(user, token)
        # Status is already set
        return user
