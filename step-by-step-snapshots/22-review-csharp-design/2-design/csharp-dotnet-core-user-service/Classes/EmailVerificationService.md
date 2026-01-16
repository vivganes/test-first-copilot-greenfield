# EmailVerificationService

## Properties
- EmailVerificationTokenRepository: IEmailVerificationTokenRepository
- UserRepository: IUserRepository
- EmailService: IEmailService
- UnitOfWork: IUnitOfWork
- Logger: ILogger
- Configuration: IConfiguration

## Methods
- GenerateVerificationToken(Guid userId): EmailVerificationToken
- SendVerificationEmail(User user, EmailVerificationToken token): Task
- VerifyEmail(string token): bool
- IsTokenValid(string token): bool
- CleanupExpiredTokens(): Task
- BuildVerificationUrl(string token): string

## Related Classes
- IEmailVerificationService: This class implements this interface.
- EmailVerificationToken: Entity used for token management.
- IEmailVerificationTokenRepository: Used for token persistence.
- IEmailService: Used to send verification emails.
