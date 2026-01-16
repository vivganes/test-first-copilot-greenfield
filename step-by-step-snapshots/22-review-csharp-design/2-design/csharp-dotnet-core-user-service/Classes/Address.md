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

## Related Classes
- User: Address belongs to a User.
- UserRegistrationRequest: Contains Address for onboarding.
