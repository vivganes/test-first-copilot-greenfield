# GH Copilot code - starts
"""
Unit tests for UserRegistrationService
"""
import pytest
from src.api.user_registration_service import UserRegistrationService, UserDTO

class MockUserRepository:
    def create_user(self, user):
        return user
class MockAddressRepository:
    def create_address(self, address):
        return address
class MockPasswordHasher:
    def hash(self, password):
        return "hashed-password"
class MockEmailVerificationService:
    def generate_token(self, user):
        return "token"
class MockEmailService:
    def send_verification_email(self, user, token):
        return True

class TestUserRegistrationService:
    def test_register_user_success(self):
        service = UserRegistrationService(
            user_repo=MockUserRepository(),
            address_repo=MockAddressRepository(),
            password_hasher=MockPasswordHasher(),
            email_verification_service=MockEmailVerificationService(),
            email_service=MockEmailService()
        )
        user_dto = UserDTO(
            email="alice.smith@example.com",
            password="Str0ngP@ssw0rd!",
            name="Alice Smith",
            phone_number="+1-555-123-4567",
            address={"city": "Springfield"}
        )
        result = service.register_user(user_dto)
        assert result.email == user_dto.email
        assert result.status == "Active"
# GH Copilot code - end
