# GH Copilot code - starts
import pytest
from flask import json
from sqlalchemy import text
import uuid

@pytest.mark.usefixtures("client", "db_session")
class TestUserRegistration:
    def test_successful_registration(self, client, db_session):
        payload = {
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
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 201
        data = response.get_json()
        assert data["message"] == "Please check your email to verify your account"
        assert data["emailVerified"] is False
        assert data["role"] == "Customer"
        assert data["status"] == "Active"
        assert "userId" in data
        # DB assertions
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is not None
        assert user["name"] == payload["name"]
        assert user["emailVerified"] == 0
        assert user["status"] == "Active"
        # Role assertion
        role = db_session.execute(text("SELECT * FROM UserRole WHERE userId=:userId"), {"userId": user["id"]}).fetchone()
        assert role is not None
        assert role["role"] == "Customer"
        # Address assertion
        address = db_session.execute(text("SELECT * FROM Address WHERE userId=:userId AND type='Shipping'"), {"userId": user["id"]}).fetchone()
        assert address is not None
        assert address["line1"] == payload["address"]["line1"]
        assert address["city"] == payload["address"]["city"]
        assert address["country"] == payload["address"]["country"]

    def test_successful_email_verification(self, client, db_session):
        # Create user and email verification token in DB
        user_id = str(uuid.uuid4())
        email = "verify.me@example.com"
        db_session.execute(text("""
            INSERT INTO User (id, name, email, password, status, createdAt, updatedAt, phoneNumber, emailVerified, anonymized)
            VALUES (:id, :name, :email, :password, 'Active', datetime('now'), datetime('now'), :phoneNumber, 0, 0)
        """), {
            "id": user_id,
            "name": "Verify Me",
            "email": email,
            "password": "hashedpassword",
            "phoneNumber": "+1-555-000-1111"
        })
        db_session.execute(text("""
            INSERT INTO UserRole (userId, role) VALUES (:userId, 'Customer')
        """), {"userId": user_id})
        token = str(uuid.uuid4())
        db_session.execute(text("""
            INSERT INTO EmailVerificationToken (id, userId, token, expiresAt, createdAt, isUsed)
            VALUES (:id, :userId, :token, datetime('now', '+1 day'), datetime('now'), 0)
        """), {
            "id": str(uuid.uuid4()),
            "userId": user_id,
            "token": token
        })
        db_session.commit()
        response = client.post("/api/v1/users/verify-email", data=json.dumps({"token": token}), content_type="application/json")
        assert response.status_code == 200
        data = response.get_json()
        assert data["message"] == "Email verified successfully"
        assert data["emailVerified"] is True
        assert data["status"] == "Active"
        # DB assertion
        user = db_session.execute(text("SELECT * FROM User WHERE id=:id"), {"id": user_id}).fetchone()
        assert user is not None
        assert user["emailVerified"] == 1
        assert user["status"] == "Active"

    def test_registration_with_existing_email(self, client, db_session):
        # Create user in DB directly
        user_id = str(uuid.uuid4())
        db_session.execute(text("""
            INSERT INTO User (id, name, email, password, status, createdAt, updatedAt, phoneNumber, emailVerified, anonymized)
            VALUES (:id, :name, :email, :password, 'Active', datetime('now'), datetime('now'), :phoneNumber, 0, 0)
        """), {
            "id": user_id,
            "name": "Alice S.",
            "email": "alice.smith@example.com",
            "password": "hashedpassword",
            "phoneNumber": "+1-555-987-6543"
        })
        db_session.execute(text("""
            INSERT INTO UserRole (userId, role) VALUES (:userId, 'Customer')
        """), {"userId": user_id})
        db_session.commit()
        payload = {
            "email": "alice.smith@example.com",
            "password": "AnotherP@ss1!",
            "name": "Alice S.",
            "phoneNumber": "+1-555-987-6543",
            "address": {
                "type": "Shipping",
                "line1": "456 Elm St",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62702",
                "country": "USA",
                "isDefault": True
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 409
        data = response.get_json()
        assert "Email already registered" in data["error"]
        # DB assertion: only one user with this email
        users = db_session.execute(text("SELECT COUNT(*) FROM User WHERE email=:email"), {"email": payload["email"]}).scalar()
        assert users == 1

    def test_registration_invalid_email_format(self, client, db_session):
        payload = {
            "email": "alice.smith#example.com",
            "password": "Str0ngP@ssw0rd!",
            "name": "Alice Smith",
            "phoneNumber": "+1-555-123-4567",
            "address": {
                "type": "Shipping",
                "line1": "123 Main St",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62701",
                "country": "USA",
                "isDefault": True
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 400
        data = response.get_json()
        assert "Invalid email format" in data["error"]
        # DB assertion: no user created
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is None

    def test_registration_weak_password_too_short(self, client, db_session):
        payload = {
            "email": "bob.jones@example.com",
            "password": "12345",
            "name": "Bob Jones",
            "phoneNumber": "+1-555-222-3333",
            "address": {
                "type": "Shipping",
                "line1": "789 Oak St",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62703",
                "country": "USA",
                "isDefault": True
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 400
        data = response.get_json()
        assert "Password is too weak" in data["error"]
        # DB assertion: no user created
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is None

    def test_registration_invalid_password_no_uppercase(self, client, db_session):
        payload = {
            "email": "bob.jones@example.com",
            "password": "str0ngp@ssw0rd!",
            "name": "Bob Jones",
            "phoneNumber": "+1-555-222-3333",
            "address": {
                "type": "Shipping",
                "line1": "789 Oak St",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62703",
                "country": "USA",
                "isDefault": True
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 400
        data = response.get_json()
        assert "Password must contain at least one uppercase letter" in data["error"]
        # DB assertion: no user created
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is None

    def test_registration_invalid_name_format(self, client, db_session):
        payload = {
            "email": "alice.smith@example.com",
            "password": "Str0ngP@ssw0rd!",
            "name": "Alice123",
            "phoneNumber": "+1-555-123-4567",
            "address": {
                "type": "Shipping",
                "line1": "123 Main St",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62701",
                "country": "USA",
                "isDefault": True
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 400
        data = response.get_json()
        assert "Name must contain only letters and spaces" in data["error"]
        # DB assertion: no user created
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is None

    def test_registration_missing_required_fields(self, client, db_session):
        payload = {
            "email": "",
            "password": "Str0ngP@ssw0rd!",
            "name": "",
            "phoneNumber": "",
            "address": {
                "type": "Shipping",
                "line1": "",
                "city": "",
                "state": "",
                "postalCode": "",
                "country": "",
                "isDefault": True
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 400
        data = response.get_json()
        assert "All fields are required" in data["error"]
        # DB assertion: no user created
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is None

    def test_registration_invalid_phone_number(self, client, db_session):
        payload = {
            "email": "alice.smith@example.com",
            "password": "Str0ngP@ssw0rd!",
            "name": "Alice Smith",
            "phoneNumber": "abc123",
            "address": {
                "type": "Shipping",
                "line1": "123 Main St",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62701",
                "country": "USA",
                "isDefault": True,
                "phoneNumber": "abc123"
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 400
        data = response.get_json()
        assert "Invalid phone number" in data["error"]
        # DB assertion: no user created
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is None

    def test_registration_phone_number_too_short(self, client, db_session):
        payload = {
            "email": "alice.smith@example.com",
            "password": "Str0ngP@ssw0rd!",
            "name": "Alice Smith",
            "phoneNumber": "123",
            "address": {
                "type": "Shipping",
                "line1": "123 Main St",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62701",
                "country": "USA",
                "isDefault": True,
                "phoneNumber": "123"
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 400
        data = response.get_json()
        assert "Phone number must be at least 10 digits" in data["error"]
        # DB assertion: no user created
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is None

    def test_registration_international_phone_format(self, client, db_session):
        payload = {
            "email": "charlie.brown@example.com",
            "password": "Str0ngP@ssw0rd!",
            "name": "Charlie Brown",
            "phoneNumber": "+44-20-7946-0958",
            "address": {
                "type": "Shipping",
                "line1": "221B Baker St",
                "city": "London",
                "state": "",
                "postalCode": "NW1 6XE",
                "country": "UK",
                "isDefault": True,
                "phoneNumber": "+44-20-7946-0958"
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 201
        data = response.get_json()
        assert "Registration successful" in data["message"]
        # DB assertion
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is not None
        assert user["phoneNumber"] == payload["phoneNumber"]
        address = db_session.execute(text("SELECT * FROM Address WHERE userId=:userId AND type='Shipping'"), {"userId": user["id"]}).fetchone()
        assert address is not None
        assert address["country"] == payload["address"]["country"]

    def test_registration_address_exceeds_max_length(self, client, db_session):
        long_address = "A very long address that exceeds the maximum allowed length of 255 characters " + ("." * 200)
        payload = {
            "email": "dave.long@example.com",
            "password": "Str0ngP@ssw0rd!",
            "name": "Dave Long",
            "phoneNumber": "+1-555-888-9999",
            "address": {
                "type": "Shipping",
                "line1": long_address,
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62705",
                "country": "USA",
                "isDefault": True
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 400
        data = response.get_json()
        assert "Address is too long" in data["error"]
        # DB assertion: no user created
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is None

    def test_registration_minimum_valid_password_length(self, client, db_session):
        payload = {
            "email": "eve.martin@example.com",
            "password": "Abcdef1!",
            "name": "Eve Martin",
            "phoneNumber": "+1-555-666-7777",
            "address": {
                "type": "Shipping",
                "line1": "654 Maple St",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62704",
                "country": "USA",
                "isDefault": True
            }
        }
        response = client.post("/api/v1/users/register", data=json.dumps(payload), content_type="application/json")
        assert response.status_code == 201
        data = response.get_json()
        assert "Registration successful" in data["message"]
        assert data["role"] == "Customer"
        assert data["status"] == "Active"
        # DB assertion
        user = db_session.execute(text("SELECT * FROM User WHERE email=:email"), {"email": payload["email"]}).fetchone()
        assert user is not None
        assert user["name"] == payload["name"]
        assert user["status"] == "Active"
# GH Copilot code - end
