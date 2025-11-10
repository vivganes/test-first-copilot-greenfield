// GH Copilot code - starts
# EmailVerificationService

## Properties
- None (stateless service)

## Methods
- `verifyEmailToken(token: string): Observable<VerificationResult>` — Verifies the email token with backend.
- `resendVerificationEmail(email: string): Observable<void>` — Requests backend to resend verification email.

## Related Classes
- `EmailVerificationComponent`: Uses this service for verification logic.
- `ApiService`: May be used for HTTP requests.

// GH Copilot code - end
