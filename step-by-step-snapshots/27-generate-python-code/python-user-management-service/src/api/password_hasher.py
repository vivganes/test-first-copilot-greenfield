# GH Copilot code - starts
"""
PasswordHasher implementation for password hashing and verification
"""
import hashlib

class PasswordHasher:
    def hash(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

    def verify(self, password, hashed):
        return self.hash(password) == hashed
# GH Copilot code - end
