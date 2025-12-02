# Category

## Description

Categories organize products into logical groups, making it easier for customers to browse and discover items. Categories can be nested to form a hierarchy.

## Attributes

| Attribute   | Type      | Description                        |
|-------------|-----------|------------------------------------|
| id          | UUID      | Unique identifier for the category |
| name        | String    | Category name                      |
| description | String    | Description of the category        |
| parentId    | UUID      | Reference to parent category       |

## Business Rules

- Category names must be unique.
- Categories can be nested (parent-child).
- Products must belong to at least one category.

## Relationships

- Has many: Product (one-to-many)
- May have: Parent Category (self-reference)
