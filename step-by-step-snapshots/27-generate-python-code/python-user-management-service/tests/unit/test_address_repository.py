"""
Unit tests for AddressRepository
"""
from src.api.address_repository import AddressRepository, Address
import pytest

@pytest.fixture
def mock_db_session():
    class DummySession:
        def execute(self, *args, **kwargs):
            return self
        def commit(self):
            pass
        def mappings(self):
            return self
        def fetchone(self):
            return None
    return DummySession()

class TestAddressRepository:
    def test_create_address_success(self, mock_db_session):
        repo = AddressRepository(mock_db_session)
        address = Address(
            user_id="user-1",
            type="Shipping",
            line1="123 Main St",
            line2=None,
            city="Springfield",
            state="IL",
            postal_code="62701",
            country="USA",
            is_default=True,
            phone_number="+1-555-123-4567"
        )
        result = repo.create_address(address)
        assert result.line1 == address.line1
        assert result.city == address.city
        assert result.isDefault == 1
