
// GH Copilot code - starts
# PhoneInputComponent

## Properties
- `phoneForm: FormControl` — Form control for phone input.
- `countryCode: string` — Selected or detected country code.
- `isValid: boolean` — Indicates if phone number is valid.
- `errorMessage: string` — Error message for invalid phone number.

## Methods
- `validatePhoneNumber(): boolean` — Validates phone number against pattern `^\+?[0-9\- ]{10,20}$`.
- `formatPhoneNumber(): string` — Formats phone number for display/submission.
- `getCountryCode(): string` — Detects or returns selected country code.
- `handlePhoneInput(value: string): void` — Handles input changes and triggers validation.

## Design Requirements
- Support international phone formats
- Real-time validation with API pattern
- Country code detection/selection
- Clear error messaging
- Integration with FormValidationService

## Related Classes
- `RegistrationFormComponent`: Uses this component for phone input.
- `FormValidationService`: Used for validation logic.
// GH Copilot code - end
