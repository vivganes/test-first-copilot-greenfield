# AddressField

**Description:**
Composite component for address input (street, city, state, zip, etc.).

## Properties
- `value`: Object with address fields
- `onChange`: Change handler
- `error`: Error message
- `required`: Boolean

## Methods
- `handleFieldChange(field, value)`: Updates specific address field

## Related Classes
- **RegistrationForm**: Uses this for address input
- **validationUtils**: For address validation
- **FormErrorMessage**: For error display