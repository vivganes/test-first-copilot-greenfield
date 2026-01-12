# GH Copilot code - starts
"""
UserRepository implementation for user persistence using SQLAlchemy
"""
import uuid
from datetime import datetime
from sqlalchemy import text

class User:
    def __init__(self, email, name, password_hash, phone_number):
        self.id = str(uuid.uuid4())
        self.email = email
        self.name = name
        self.password_hash = password_hash
        self.phone_number = phone_number
        self.status = "Active"
        self.createdAt = datetime.utcnow().isoformat()
        self.updatedAt = datetime.utcnow().isoformat()
        self.emailVerified = 0

class UserRepository:
    def __init__(self, db_session):
        self.db_session = db_session

    def create_user(self, user):
        # Insert user into DB
        self.db_session.execute(
            text("""
            INSERT INTO User (id, name, email, password, status, createdAt, updatedAt, phoneNumber, emailVerified)
            VALUES (:id, :name, :email, :password, :status, :createdAt, :updatedAt, :phoneNumber, :emailVerified)
            """),
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "password": user.password_hash,
                "status": user.status,
                "createdAt": user.createdAt,
                "updatedAt": user.updatedAt,
                "phoneNumber": user.phone_number,
                "emailVerified": user.emailVerified
            }
        )
        self.db_session.execute(
            text("""
            INSERT INTO UserRole (userId, role) VALUES (:userId, :role)
            """),
            {"userId": user.id, "role": "Customer"}
        )
        self.db_session.commit()
        return user
# GH Copilot code - end
