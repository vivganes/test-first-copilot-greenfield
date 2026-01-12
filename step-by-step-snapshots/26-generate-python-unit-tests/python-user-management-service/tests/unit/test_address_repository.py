# GH Copilot code - starts
"""
Unit tests for AddressRepository
"""
from src.api.address_repository import AddressRepository, Address

class TestAddressRepository:
    def test_create_address_success(self, mock_db_session):
        repo = AddressRepository(mock_db_session)
        address = Address(type="Shipping", line1="123 Main St", city="Springfield", state="IL", postal_code="62701", country="USA", is_default=True, phone_number="+1-555-123-4567")
        result = repo.create_address(address)
        assert result.line1 == address.line1
        assert result.city == address.city
        assert result.is_default is True
# GH Copilot code - end
