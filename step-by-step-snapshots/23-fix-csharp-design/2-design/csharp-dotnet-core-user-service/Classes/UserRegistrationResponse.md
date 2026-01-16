# UserRegistrationResponse

## Properties
- Message: string
- UserId: string
- EmailVerified: bool
- Status: string
- Role: string
// GH Copilot code - starts
- Message: string (e.g., "Please check your email to verify your account")
- Role: string (always "Customer" for registration)
// GH Copilot code - end

## Methods
- None (DTO)

## Related Classes
- UserRegistrationController: Returns this DTO.
- UserRegistrationService: Produces this DTO.
