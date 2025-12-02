# UserValidator

## Methods
- Validate(request: UserRegistrationRequest): bool
// GH Copilot code - starts
- Validate(request: UserRegistrationRequest): bool
	- Validates password using API regex: ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:;'<>,.?]).{8,255}$
	- Validates address: optional, but if present, all required fields must be valid
	- Returns error messages matching API and E2E test expectations
// GH Copilot code - end

## Related Classes
- IUserValidator: UserValidator implements this interface.
- UserRegistrationRequest: Input for validation.
