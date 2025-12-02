# UserRegistrationService

## Properties
- UserRepository: IUserRepository
- PasswordHasher: IPasswordHasher
- EmailService: IEmailService (optional)
- UserValidator: IUserValidator

## Methods
- RegisterUser(request: UserRegistrationRequest): UserRegistrationResponse

## Related Classes
- IUserRegistrationService: UserRegistrationService implements this interface.
- UserRepository: Used for user persistence.
- PasswordHasher: Used for password security.
- EmailService: Used for sending verification emails.
- UserValidator: Used for validating registration data.
