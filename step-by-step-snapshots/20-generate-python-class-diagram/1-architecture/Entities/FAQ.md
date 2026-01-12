# FAQ

## Description
Stores frequently asked questions and their answers for the FAQ page.

## Attributes
| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the FAQ entry         |
| question    | String    | The question                                |
| answer      | String    | The answer                                  |
| isActive    | Boolean   | Whether the FAQ is currently shown          |
| createdAt   | DateTime  | FAQ creation timestamp                      |
| updatedAt   | DateTime  | Last update timestamp                       |

## Business Rules
- Only active FAQs are shown to users.

## Relationships
- None
