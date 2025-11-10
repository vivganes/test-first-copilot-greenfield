"""
UserDTO for user registration
"""
import re
class UserDTO:
    def __init__(self, email, password, name, phone_number, address):
        if not self._is_valid_email(email):
            raise ValueError("Invalid email")
        self.email = email
        self.password = password
        self.name = name
        self.phone_number = phone_number
        self.address = address
        self.status = None

    @staticmethod
    def _is_valid_email(email):
        return re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", email)

    @classmethod
    def from_dict(cls, data):
        return cls(
            email=data.get("email"),
            password=data.get("password"),
            name=data.get("name"),
            phone_number=data.get("phoneNumber"),
            address=data.get("address")
        )
