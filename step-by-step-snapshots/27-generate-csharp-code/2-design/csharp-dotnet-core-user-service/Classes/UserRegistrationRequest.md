# UserRegistrationRequest

## Properties
- Email: string
- Password: string
- Name: string
- PhoneNumber: string
- Address: Address (optional)
// GH Copilot code - starts
- Role: string (default 'Customer', assigned during registration)
// GH Copilot code - end

## Methods
- Validate(): bool
// GH Copilot code - starts
- Validate(): bool
	- Validates email format and uniqueness
	- Validates password using API regex: ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:;'<>,.?]).{8,255}$
	- If Address is provided, validates all required fields are present and valid
	- Returns error messages matching API and E2E test expectations
// GH Copilot code - end

## Related Classes
- Address: Included as part of registration request.
- UserRegistrationController: Receives this DTO.
- UserRegistrationService: Uses this DTO for registration logic.
