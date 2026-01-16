# IEmailVerificationService

## Methods
- GenerateVerificationToken(Guid userId): EmailVerificationToken
- SendVerificationEmail(User user, EmailVerificationToken token): Task
- VerifyEmail(string token): bool
- IsTokenValid(string token): bool
- CleanupExpiredTokens(): Task

## Related Classes
- EmailVerificationService: Concrete implementation of this interface.
- UserRegistrationService: Uses this service during registration.
- EmailVerificationController: Uses this service for verification endpoints.
