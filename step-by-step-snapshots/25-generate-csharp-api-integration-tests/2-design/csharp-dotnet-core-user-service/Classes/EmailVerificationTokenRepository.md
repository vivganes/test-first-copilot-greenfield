# EmailVerificationTokenRepository

## Properties
- DbContext: ApplicationDbContext

## Methods
- Add(EmailVerificationToken token): void
- GetByToken(string token): EmailVerificationToken
- GetByUserId(Guid userId): List<EmailVerificationToken>
- Update(EmailVerificationToken token): void
- Delete(EmailVerificationToken token): void
- GetExpiredTokens(): List<EmailVerificationToken>
- DeleteExpiredTokens(): void

## Related Classes
- IEmailVerificationTokenRepository: This class implements this interface.
- ApplicationDbContext: Database context used for data operations.
- EmailVerificationToken: Entity managed by this repository.
