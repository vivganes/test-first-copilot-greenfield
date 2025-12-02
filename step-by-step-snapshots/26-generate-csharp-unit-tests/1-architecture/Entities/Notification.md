# Notification

## Description

Represents a message sent to a user, such as order updates, promotions, or alerts. Notifications can be delivered via email, SMS, or in-app.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the notification      |
| userId      | UUID      | Reference to the User                       |
| type        | Enum      | Email, SMS, InApp                           |
| message     | String    | Notification content                        |
| status      | Enum      | Sent, Pending, Failed, Read                 |
| createdAt   | DateTime  | Notification creation timestamp             |
| sentAt      | DateTime  | When the notification was sent              |

## Business Rules

- Notifications must be delivered promptly.
- Status must be updated based on delivery outcome.

## Relationships

- Belongs to: User
