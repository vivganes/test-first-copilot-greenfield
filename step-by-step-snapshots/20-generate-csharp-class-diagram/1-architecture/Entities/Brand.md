# Brand

## Description
Represents a product brand for filtering, search, and display.

## Attributes
| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the brand             |
| name        | String    | Brand name (unique)                         |
| description | String    | Description of the brand                    |
| logoUrl     | String    | Logo image URL (optional)                   |
| createdAt   | DateTime  | Brand creation timestamp                    |
| updatedAt   | DateTime  | Last update timestamp                       |

## Business Rules
- Brand names must be unique.

## Relationships
- Has many: Product
