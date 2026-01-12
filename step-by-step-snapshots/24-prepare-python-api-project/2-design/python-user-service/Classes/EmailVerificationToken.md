# EmailVerificationToken

// GH Copilot code - starts
**Properties:**
- id: str (UUID4)
- token: str (unique, URL-safe)
- user_id: str
- expires_at: datetime
- created_at: datetime
- used_at: datetime (nullable)
- is_used: bool

**Methods:**
- is_expired(): bool
- is_valid(): bool
- mark_as_used(): void
// GH Copilot code - end