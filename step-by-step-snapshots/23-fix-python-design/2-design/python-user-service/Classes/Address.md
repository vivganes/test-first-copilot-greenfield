# Address

**Properties:**
- id: str (UUID4, generated via uuid.uuid4().hex)
- type: str (Shipping or Billing)
- line1: str
- line2: str (optional)
- city: str
- state: str
- postal_code: str
- country: str
- is_default: bool
- phone_number: str (optional)

**Methods:**
- validate(): Validates address fields
- assign_type(type: str = 'Shipping'): Assigns type during registration (default 'Shipping')
- set_default(is_default: bool = True): Sets as default address for user if first address

**ID Generation:**
- ID is generated in the Address constructor using uuid.uuid4().hex

**Related Classes:**
- User: Used as a property in User
- ValidationService: Used for validation
