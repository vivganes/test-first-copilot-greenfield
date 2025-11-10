"""
AddressRepository implementation for address persistence using SQLAlchemy
"""
import uuid
from datetime import datetime
from sqlalchemy import text

class Address:
    def __init__(self, user_id, type, line1, line2, city, state, postal_code, country, is_default, phone_number):
        self.id = str(uuid.uuid4())
        self.userId = user_id
        self.type = type
        self.line1 = line1
        self.line2 = line2
        self.city = city
        self.state = state
        self.postalCode = postal_code
        self.country = country
        self.isDefault = 1 if is_default else 0
        self.createdAt = datetime.utcnow().isoformat()
        self.updatedAt = datetime.utcnow().isoformat()
        self.phoneNumber = phone_number

class AddressRepository:
    def __init__(self, db_session):
        self.db_session = db_session

    def create_address(self, address):
        self.db_session.execute(
            text("""
            INSERT INTO Address (id, userId, type, line1, line2, city, state, postalCode, country, isDefault, createdAt, updatedAt, phoneNumber)
            VALUES (:id, :userId, :type, :line1, :line2, :city, :state, :postalCode, :country, :isDefault, :createdAt, :updatedAt, :phoneNumber)
            """),
            {
                "id": address.id,
                "userId": address.userId,
                "type": address.type,
                "line1": address.line1,
                "line2": address.line2,
                "city": address.city,
                "state": address.state,
                "postalCode": address.postalCode,
                "country": address.country,
                "isDefault": address.isDefault,
                "createdAt": address.createdAt,
                "updatedAt": address.updatedAt,
                "phoneNumber": address.phoneNumber
            }
        )
        self.db_session.commit()
        return address
