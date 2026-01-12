# RegistrationForm

**Description:**
Main form component for user registration. Handles form layout, submission, and error display.

## Properties
- `fields`: Array of field definitions (name, label, type, validation)
- `onSubmit`: Function to handle form submission
- `loading`: Boolean indicating if submission is in progress
- `error`: Error message to display
- `success`: Success message to display

## Methods
- `handleChange(field, value)`: Updates field value in state
- `handleSubmit()`: Validates and submits the form
- `resetForm()`: Resets all fields to initial state

## Related Classes
- **RegistrationField**: Used to render each input field
- **useRegistrationForm**: Hook for managing form state and logic
- **RegistrationService**: Handles API call for registration
- **FormErrorMessage**: Displays error messages
- **SuccessMessage**: Displays success message after registration