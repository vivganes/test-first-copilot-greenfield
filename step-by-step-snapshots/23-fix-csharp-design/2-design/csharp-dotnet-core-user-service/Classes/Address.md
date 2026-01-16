# Address

## Properties
- Id: UUID
- UserId: UUID
- Type: enum (Shipping, Billing)
- Line1: string
- Line2: string (optional)
- City: string
- State: string
- PostalCode: string
- Country: string
- IsDefault: bool
- CreatedAt: DateTime
- UpdatedAt: DateTime
- PhoneNumber: string (optional)

## Methods
- Validate(): bool
// GH Copilot code - starts
- Validate(): bool
	- If Address is provided, all required fields (Line1, City, State, PostalCode, Country, Type, IsDefault) must be present and valid
	- Returns error messages for missing or invalid fields as per API and E2E test expectations
// GH Copilot code - end

## Related Classes
- User: Address belongs to a User.
- UserRegistrationRequest: Contains Address for onboarding.
