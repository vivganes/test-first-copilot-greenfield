// GH Copilot code - starts
# EmailVerificationComponent

## Properties
- `verificationToken: string` — Token extracted from URL for verification.
- `verificationStatus: VerificationStatus` — Current status of verification.
- `isLoading: boolean` — Indicates if verification is in progress.
- `errorMessage: string` — Error message for failed verification.

## Methods
- `ngOnInit()` — Initializes component, extracts token from URL, starts verification.
- `verifyEmail(token: string): Observable<VerificationResult>` — Calls service to verify email.
- `handleVerificationSuccess()` — Handles successful verification.
- `handleVerificationError(error: ApiError)` — Handles verification errors.
- `redirectToLogin()` — Navigates to login after success.

## Related Classes
- `EmailVerificationService`: Used to verify email token and resend verification.
- `ApiError`: Used for error handling.

// GH Copilot code - end
