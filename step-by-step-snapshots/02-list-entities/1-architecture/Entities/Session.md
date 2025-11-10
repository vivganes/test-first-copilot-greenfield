# Session

## Description

Represents an authenticated user's session in the system, tracking login state, activity, and expiration for security and user experience.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the session           |
| userId      | UUID      | Reference to the User                       |
| token       | String    | Session or authentication token             |
| createdAt   | DateTime  | Session creation timestamp                  |
| expiresAt   | DateTime  | Session expiration timestamp                |
| lastActive  | DateTime  | Last activity timestamp                     |
| ipAddress   | String    | IP address of the user                      |
| userAgent   | String    | User agent string of the client             |

## Business Rules

- Sessions expire after a configurable period of inactivity.
- Only one active session per user per device is allowed (optional).
- Tokens must be securely generated and stored.

## Relationships

- Belongs to: User
