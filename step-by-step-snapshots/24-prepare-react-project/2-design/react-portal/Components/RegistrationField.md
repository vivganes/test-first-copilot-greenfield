# RegistrationField

**Description:**
Generic input field component for registration form (text, email, etc.).

## Properties
- `name`: Field name (e.g., 'email')
- `label`: Field label
- `type`: Input type (text, email, password, etc.)
- `value`: Current value
- `onChange`: Change handler
- `error`: Error message for this field
- `required`: Boolean indicating if field is mandatory

## Methods
- `handleInputChange(e)`: Calls `onChange` with new value

## Related Classes
- **RegistrationForm**: Parent component
- **validationUtils**: Used for field validation
- **FormErrorMessage**: Displays field-specific errors