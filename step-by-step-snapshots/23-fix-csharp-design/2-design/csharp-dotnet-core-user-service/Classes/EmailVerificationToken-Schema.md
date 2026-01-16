# EmailVerificationToken Database Schema

## SQLite Table Definition

```sql
-- EmailVerificationToken Table
CREATE TABLE EmailVerificationToken (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    createdAt TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    isUsed INTEGER NOT NULL DEFAULT 0,
    usedAt TEXT,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Index for faster token lookups
CREATE INDEX idx_emailverificationtoken_token ON EmailVerificationToken(token);
CREATE INDEX idx_emailverificationtoken_userid ON EmailVerificationToken(userId);
CREATE INDEX idx_emailverificationtoken_expiresat ON EmailVerificationToken(expiresAt);
```

## Entity Framework Configuration

```csharp
// In ApplicationDbContext.OnModelCreating
modelBuilder.Entity<EmailVerificationToken>(entity =>
{
    entity.HasKey(e => e.Id);
    entity.Property(e => e.Id).IsRequired();
    entity.Property(e => e.UserId).IsRequired();
    entity.Property(e => e.Token).IsRequired().HasMaxLength(255);
    entity.HasIndex(e => e.Token).IsUnique();
    entity.Property(e => e.CreatedAt).IsRequired();
    entity.Property(e => e.ExpiresAt).IsRequired();
    entity.Property(e => e.IsUsed).IsRequired();
    
    entity.HasOne<User>()
          .WithMany()
          .HasForeignKey(e => e.UserId)
          .OnDelete(DeleteBehavior.Cascade);
});
```

## Related Classes
- User: Each token belongs to a user.
- EmailVerificationService: Creates and manages these tokens.
- EmailVerificationTokenRepository: Handles CRUD operations for tokens.