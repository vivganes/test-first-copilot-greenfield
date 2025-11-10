# EmailVerificationService

// GH Copilot code - starts
**Properties:**
- token_repository: EmailVerificationTokenRepository
- user_repository: UserRepository
- email_service: EmailService
- token_generator: TokenGenerator

**Methods:**
- generate_verification_token(user: User): EmailVerificationToken
- send_verification_email(user: User): void
- verify_email_token(token: str): bool
- resend_verification_email(email: str): void
// GH Copilot code - end