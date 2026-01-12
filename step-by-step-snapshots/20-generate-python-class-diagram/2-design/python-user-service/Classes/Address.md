# Address

**Properties:**
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

**Related Classes:**
- User: Used as a property in User
- ValidationService: Used for validation
