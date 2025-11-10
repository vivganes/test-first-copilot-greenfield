# GH Copilot code - starts
"""
Unit tests for EmailVerificationService
"""
from src.api.email_verification_service import EmailVerificationService, User

class TestEmailVerificationService:
    def test_generate_token(self):
        service = EmailVerificationService()
        user = User(email="alice.smith@example.com", name="Alice Smith")
        token = service.generate_token(user)
        assert isinstance(token, str)
        assert len(token) > 0
# GH Copilot code - end
