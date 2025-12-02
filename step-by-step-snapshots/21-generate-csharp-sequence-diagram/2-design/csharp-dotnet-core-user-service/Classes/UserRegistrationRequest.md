# UserRegistrationRequest

## Properties
- Email: string
- Password: string
- Name: string
- PhoneNumber: string
- Address: Address (optional)

## Methods
- Validate(): bool

## Related Classes
- Address: Included as part of registration request.
- UserRegistrationController: Receives this DTO.
- UserRegistrationService: Uses this DTO for registration logic.
