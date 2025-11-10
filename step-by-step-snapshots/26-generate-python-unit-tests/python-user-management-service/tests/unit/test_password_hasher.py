# GH Copilot code - starts
"""
Unit tests for PasswordHasher
"""
import pytest
from src.api.password_hasher import PasswordHasher

class TestPasswordHasher:
    def test_hash_and_verify(self):
        password = "Str0ngP@ssw0rd!"
        hasher = PasswordHasher()
        hashed = hasher.hash(password)
        assert hashed != password
        assert hasher.verify(password, hashed)

    def test_hash_is_different_for_different_passwords(self):
        hasher = PasswordHasher()
        hash1 = hasher.hash("Password1!")
        hash2 = hasher.hash("Password2!")
        assert hash1 != hash2
# GH Copilot code - end
