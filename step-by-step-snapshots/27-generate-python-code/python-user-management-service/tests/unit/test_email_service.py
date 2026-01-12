# GH Copilot code - starts
"""
Unit tests for EmailService (success path)
"""
from src.api.email_service import EmailService, User

class TestEmailService:
    def test_send_verification_email_success(self):
        service = EmailService()
        user = User(email="alice.smith@example.com", name="Alice Smith")
        token = "sometoken"
        result = service.send_verification_email(user, token)
        assert result is True
# GH Copilot code - end
