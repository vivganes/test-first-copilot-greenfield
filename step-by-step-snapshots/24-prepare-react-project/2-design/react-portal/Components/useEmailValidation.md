# useEmailValidation

**Description:**
Custom hook for validating email format and uniqueness.

## Properties (State)
- `valid`: Boolean
- `error`: Error message
- `checking`: Boolean for async check

## Methods
- `validate(email)`: Validates format and uniqueness

## Related Classes
- **RegistrationField**: Uses for email input
- **RegistrationService**: For uniqueness check