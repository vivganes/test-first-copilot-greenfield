# EmailVerificationController

## Properties
- EmailVerificationService: IEmailVerificationService
- Logger: ILogger

## Methods
- VerifyEmail(string token): IActionResult
- ResendVerificationEmail(string email): IActionResult

## Related Classes
- IEmailVerificationService: Used for email verification operations.
- EmailVerificationRequest: DTO for resend verification requests.
- EmailVerificationResponse: DTO for verification responses.
