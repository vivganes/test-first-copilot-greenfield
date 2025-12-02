# EmailVerificationToken

## Properties
- Id: Guid
- UserId: Guid
- Token: string
- CreatedAt: DateTime
- ExpiresAt: DateTime
- IsUsed: bool
- UsedAt: DateTime?

## Methods
- IsExpired(): bool
- MarkAsUsed(): void
- IsValid(): bool

## Related Classes
- User: Each verification token belongs to a user.
- EmailVerificationService: Uses this entity to manage verification tokens.
- EmailVerificationTokenRepository: Handles persistence of verification tokens.
