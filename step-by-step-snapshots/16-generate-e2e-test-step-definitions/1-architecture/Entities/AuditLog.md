# AuditLog

## Description

Tracks significant actions and changes in the system for compliance and troubleshooting. Each log entry records what happened, who did it, and when.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the log entry         |
| userId      | UUID      | Reference to the User (optional)            |
| action      | String    | Description of the action                   |
| entityType  | String    | Type of entity affected                     |
| entityId    | UUID      | Identifier of the affected entity           |
| timestamp   | DateTime  | When the action occurred                    |
| details     | JSON      | Additional details about the action         |

## Business Rules

- All critical actions must be logged.
- Logs must be immutable and auditable.

## Relationships

- Belongs to: User (optional)
