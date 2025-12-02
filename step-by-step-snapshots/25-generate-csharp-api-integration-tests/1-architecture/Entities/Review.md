# Review

## Description

Represents customer feedback and rating for a Product. Reviews help other customers make informed purchase decisions.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the review            |
| productId   | UUID      | Reference to the Product                    |
| userId      | UUID      | Reference to the User (Customer)            |
| rating      | Integer   | Rating value (e.g., 1-5)                    |
| comment     | String    | Review text                                 |
| createdAt   | DateTime  | Review creation timestamp                   |

| orderId     | UUID      | Reference to the Order (enforces one review per product per order) |


## Business Rules

- Each user can review a product only once per order (enforced by orderId).
- Rating must be within allowed range (e.g., 1-5).
- Reviews may be moderated by Admins.

## Relationships

- Belongs to: Product, User, Order
