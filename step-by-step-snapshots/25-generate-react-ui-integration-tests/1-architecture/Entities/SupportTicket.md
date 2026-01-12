# SupportTicket

## Description
Tracks customer support issues, their status, and resolution.

## Attributes
| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the ticket            |
| userId      | UUID      | Reference to the User (Customer)            |
| subject     | String    | Ticket subject                              |
| message     | String    | Ticket message or description               |
| status      | Enum      | Open, InProgress, Resolved, Closed          |
| assignedTo  | UUID      | Reference to Admin (optional)               |
| createdAt   | DateTime  | Ticket creation timestamp                   |
| updatedAt   | DateTime  | Last update timestamp                       |
| closedAt    | DateTime  | Ticket closed timestamp (optional)          |

## Business Rules
- Status must reflect ticket progress.
- Only Admins can resolve or close tickets.

## Relationships
- Belongs to: User, Admin (optional)
