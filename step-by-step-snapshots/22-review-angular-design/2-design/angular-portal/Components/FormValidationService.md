# FormValidationService

## Properties
- None (stateless service)

## Methods
- `validateEmail(email: string): boolean` — Validates email format.
- `validatePassword(password: string): boolean` — Validates password strength.
- `validatePhone(phone: string): boolean` — Validates phone number format.
- `validateAddress(address: Address): boolean` — Validates address fields.

## Related Classes
- `RegistrationFormComponent`: Uses this service for custom validation.
- `AddressInputComponent`: Uses for address validation.
- `PhoneInputComponent`: Uses for phone validation.
