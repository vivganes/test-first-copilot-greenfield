# PasswordField

**Description:**
Specialized input for password entry with show/hide and strength meter.

## Properties
- `value`: Password value
- `onChange`: Change handler
- `error`: Error message
- `showStrength`: Boolean to show strength meter
- `required`: Boolean

## Methods
- `toggleShowPassword()`: Toggles password visibility
- `calculateStrength(value)`: Returns password strength

## Related Classes
- **RegistrationForm**: Uses this for password input
- **usePasswordValidation**: Used for strength and rules
- **FormErrorMessage**: For error display