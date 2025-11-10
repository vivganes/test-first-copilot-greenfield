# GH Copilot code - starts
"""
Unit tests for UserDTO validation and mapping
"""
import pytest
from src.api.user_dto import UserDTO

class TestUserDTO:
    def test_valid_user_dto(self):
        data = {
            "email": "alice.smith@example.com",
            "password": "Str0ngP@ssw0rd!",
            "name": "Alice Smith",
            "phoneNumber": "+1-555-123-4567",
            "address": {
                "type": "Shipping",
                "line1": "123 Main St",
                "line2": "Apt 4B",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62701",
                "country": "USA",
                "isDefault": True,
                "phoneNumber": "+1-555-123-4567"
            }
        }
        user_dto = UserDTO.from_dict(data)
        assert user_dto.email == data["email"]
        assert user_dto.name == data["name"]
        assert user_dto.address["city"] == "Springfield"

    def test_invalid_email(self):
        data = {
            "email": "invalid-email",
            "password": "Str0ngP@ssw0rd!",
            "name": "Alice Smith",
            "phoneNumber": "+1-555-123-4567",
            "address": {}
        }
        with pytest.raises(ValueError):
            UserDTO.from_dict(data)
# GH Copilot code - end
