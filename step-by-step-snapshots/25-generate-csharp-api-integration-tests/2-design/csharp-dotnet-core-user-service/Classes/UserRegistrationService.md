# UserRegistrationService

## Properties
- UserRepository: IUserRepository
- PasswordHasher: IPasswordHasher
- EmailService: IEmailService (optional)
- UserValidator: IUserValidator
// GH Copilot code - starts
- EmailVerificationService: IEmailVerificationService
- UnitOfWork: IUnitOfWork
// GH Copilot code - end

## Methods
- RegisterUser(request: UserRegistrationRequest): UserRegistrationResponse
// GH Copilot code - starts
- RegisterUser(request: UserRegistrationRequest): UserRegistrationResponse
	- Validates request (including password and address logic)
	- Begins transaction (UnitOfWork)
	- Creates User record
	- Creates Address record (if provided)
	- Assigns 'Customer' role in UserRole table
	- Generates EmailVerificationToken via EmailVerificationService
	- Sends verification email via EmailVerificationService
	- Commits transaction
	- Returns UserRegistrationResponse with role and verification message
// GH Copilot code - end

## Related Classes
- IUserRegistrationService: UserRegistrationService implements this interface.
- UserRepository: Used for user persistence.
- PasswordHasher: Used for password security.
- EmailService: Used for sending verification emails.
- UserValidator: Used for validating registration data.
// GH Copilot code - starts
- EmailVerificationService: Used for email verification workflow
- UnitOfWork: Used for transaction management
// GH Copilot code - end
