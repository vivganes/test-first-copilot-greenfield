# ContactSubmission

## Description
Stores customer inquiries submitted via the contact form.

## Attributes
| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the submission        |
| userId      | UUID      | Reference to the User (optional)            |
| name        | String    | Name of the submitter                       |
| email       | String    | Email of the submitter                      |
| message     | String    | Inquiry message                             |
| status      | Enum      | New, InProgress, Resolved                   |
| createdAt   | DateTime  | Submission timestamp                        |
| resolvedAt  | DateTime  | Resolution timestamp (optional)             |

## Business Rules
- Status must reflect inquiry progress.

## Relationships
- Belongs to: User (optional)
