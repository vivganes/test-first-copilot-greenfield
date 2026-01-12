# User

**Properties:**
- id: str (userId, from response)
- email: str
- password_hash: str
- name: str
- address: Address
- phone_number: str
- email_verified: bool
- status: str
- role: str

**Methods:**
- set_password(password: str): Hashes and sets the password
- check_password(password: str): Verifies password

**Related Classes:**
- Address: Embedded as a property
- UserRepository: Used for persistence
- PasswordHasher: Used for password operations
