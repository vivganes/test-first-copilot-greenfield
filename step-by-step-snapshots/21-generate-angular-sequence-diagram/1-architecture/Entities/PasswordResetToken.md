# PasswordResetToken

## Description
Manages password recovery/reset tokens and their expiration for secure password reset flows.

## Attributes
| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the token             |
| userId      | UUID      | Reference to the User                       |
| token       | String    | Secure reset token                          |
| expiresAt   | DateTime  | Expiration timestamp                        |
| used        | Boolean   | Whether the token has been used             |
| createdAt   | DateTime  | Token creation timestamp                    |

## Business Rules
- Tokens expire after 24 hours.
- Tokens can only be used once.

## Relationships
- Belongs to: User
