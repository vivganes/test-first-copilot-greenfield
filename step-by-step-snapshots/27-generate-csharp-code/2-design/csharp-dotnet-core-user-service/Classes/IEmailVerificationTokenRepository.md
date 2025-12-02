# IEmailVerificationTokenRepository

## Methods
- Add(EmailVerificationToken token): void
- GetByToken(string token): EmailVerificationToken
- GetByUserId(Guid userId): List<EmailVerificationToken>
- Update(EmailVerificationToken token): void
- Delete(EmailVerificationToken token): void
- GetExpiredTokens(): List<EmailVerificationToken>
- DeleteExpiredTokens(): void

## Related Classes
- EmailVerificationTokenRepository: Concrete implementation of this interface.
- EmailVerificationToken: Entity managed by this repository.
- EmailVerificationService: Uses this repository for token operations.
