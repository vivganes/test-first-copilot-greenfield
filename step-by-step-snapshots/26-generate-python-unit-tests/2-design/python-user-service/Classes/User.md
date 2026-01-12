# User

**Properties:**
- id: str (UUID4, generated via uuid.uuid4().hex)
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

**ID Generation:**
- ID is generated in the User constructor using uuid.uuid4().hex for URL-safe string IDs

**Related Classes:**
- Address: Embedded as a property
- UserRepository: Used for persistence
- PasswordHasher: Used for password operations
