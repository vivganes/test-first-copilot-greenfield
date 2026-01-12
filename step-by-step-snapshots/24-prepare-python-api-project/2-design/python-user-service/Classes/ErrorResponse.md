# ErrorResponse

**Properties:**
- code: int
- message: str
- details: dict (optional)

**Methods:**
- to_dict(): Converts error to dict

**Error Handling Patterns:**
- ValidationException → 400 Bad Request
- EmailAlreadyExistsException → 409 Conflict
- RateLimitExceededException → 429 Too Many Requests
- DatabaseException → 500 Internal Server Error

**Message Formatting:**
- All error responses follow schema: { "error": string, "details": string }
- Validation errors are aggregated and returned in details

**Related Classes:**
- UserRegistrationAPI: Used for error responses
