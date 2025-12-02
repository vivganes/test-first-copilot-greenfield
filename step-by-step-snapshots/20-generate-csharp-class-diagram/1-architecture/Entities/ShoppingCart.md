# ShoppingCart

## Description

Represents a temporary collection of products selected by a Customer for potential purchase. Each user has one active shopping cart at a time.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the shopping cart     |
| userId      | UUID      | Reference to the User (Customer)            |
| createdAt   | DateTime  | Cart creation timestamp                     |
| updatedAt   | DateTime  | Last update timestamp                       |

## Business Rules

- Each user can have only one active shopping cart.
- Cart is cleared upon successful order placement.
- Cart may expire after a period of inactivity.

## Relationships

- Belongs to: User
- Has many: ShoppingCartItem (not documented separately, but represents products and quantities in the cart)
