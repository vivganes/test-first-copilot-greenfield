
// GH Copilot code - starts
# FormValidationService

## Properties
- None (stateless service)

## Methods
- `validateEmail(email: string): boolean` — Validates email format.
- `validatePassword(password: string): ValidationResult` — Validates password using pattern `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:;'<>,.?]).{8,255}$`.
- `getPasswordRequirements(): string[]` — Returns list of password requirements.
- `checkPasswordStrength(password: string): PasswordStrength` — Returns password strength (WEAK, MEDIUM, STRONG).
- `getPasswordErrors(password: string): string[]` — Returns error messages for failed requirements.
- `validatePhone(phone: string): boolean` — Validates phone number format.
- `validateAddress(address: Address): boolean` — Validates address fields.

## Interfaces & Enums
### ValidationResult
- `isValid: boolean`
- `errors: string[]`
- `suggestions?: string[]`

### PasswordStrength
- `WEAK`, `MEDIUM`, `STRONG`

## Design Requirements
- Exact API contract validation rules
- Real-time strength feedback
- Clear requirement messaging
- Visual strength indicator
- Helpful error messages

## Related Classes
- `RegistrationFormComponent`: Uses this service for custom validation.
- `AddressInputComponent`: Uses for address validation.
- `PhoneInputComponent`: Uses for phone validation.
// GH Copilot code - end
