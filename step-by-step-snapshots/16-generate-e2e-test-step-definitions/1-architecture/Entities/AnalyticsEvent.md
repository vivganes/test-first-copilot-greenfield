# AnalyticsEvent

## Description

Represents a tracked event for analytics purposes, such as page views, clicks, or purchases. Used to monitor user behavior and system performance.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the event             |
| userId      | UUID      | Reference to the User (optional)            |
| eventType   | String    | Type of event (e.g., PageView, Purchase)    |
| eventData   | JSON      | Additional event-specific data              |
| timestamp   | DateTime  | When the event occurred                     |

## Business Rules

- Events should be recorded in real-time.
- Sensitive data must not be stored in eventData.

## Relationships

- Belongs to: User (optional)
