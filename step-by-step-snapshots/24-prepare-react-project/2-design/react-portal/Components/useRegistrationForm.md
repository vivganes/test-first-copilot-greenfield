# useRegistrationForm

**Description:**
Custom hook for managing registration form state, validation, and submission.

## Properties (State)
- `values`: Object with all field values
- `errors`: Object with field errors
- `loading`: Boolean for submission state
- `success`: Boolean for success state

## Methods
- `handleChange(field, value)`: Updates field value
- `handleSubmit()`: Validates and submits form
- `resetForm()`: Resets form state

## Related Classes
- **RegistrationForm**: Uses this hook
- **validationUtils**: Used for validation
- **RegistrationService**: Used for API call