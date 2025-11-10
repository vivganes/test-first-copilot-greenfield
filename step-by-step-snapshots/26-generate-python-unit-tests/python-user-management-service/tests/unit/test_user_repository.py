# GH Copilot code - starts
"""
Unit tests for UserRepository
"""
import pytest
from src.api.user_repository import UserRepository, User

class TestUserRepository:
    def test_create_user_success(self, mock_db_session):
        repo = UserRepository(mock_db_session)
        user = User(email="alice.smith@example.com", name="Alice Smith", password_hash="hash", phone_number="+1-555-123-4567")
        result = repo.create_user(user)
        assert result.email == user.email
        assert result.name == user.name
        assert result.status == "Active"

    def test_email_uniqueness(self, mock_db_session):
        repo = UserRepository(mock_db_session)
        user1 = User(email="alice.smith@example.com", name="Alice Smith", password_hash="hash", phone_number="+1-555-123-4567")
        repo.create_user(user1)
        user2 = User(email="alice.smith@example.com", name="Bob", password_hash="hash2", phone_number="+1-555-987-6543")
        with pytest.raises(ValueError):
            repo.create_user(user2)
# GH Copilot code - end
