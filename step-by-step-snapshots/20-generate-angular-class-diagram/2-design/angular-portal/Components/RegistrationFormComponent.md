# RegistrationFormComponent

## Properties
- `form: FormGroup` — Reactive form group for user input fields.
- `fields: Array<string>` — List of form field names (email, password, name, address, phone).
- `validationMessages: { [key: string]: string }` — Custom validation messages for each field.

## Methods
- `buildForm()` — Initializes the form group and validators.
- `getFieldError(field: string): string | null` — Returns validation error for a field.
- `resetForm()` — Resets the form to initial state.

## Related Classes
- `UserRegistrationComponent`: Parent component that uses this form.
- `FormValidationService`: Provides custom validation logic.
- `AddressInputComponent`: Used for address field if address is complex.
- `PhoneInputComponent`: Used for phone field if phone is complex.
