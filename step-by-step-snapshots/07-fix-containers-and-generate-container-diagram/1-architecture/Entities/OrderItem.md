# OrderItem

## Description

Represents an individual product within an Order, including quantity and price at the time of purchase.

## Attributes

| Attribute     | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| id            | UUID      | Unique identifier for the order item     |
| orderId       | UUID      | Reference to Order                       |
| productId     | UUID      | Reference to Product                     |
| quantity      | Integer   | Number of units ordered                  |
| price         | Decimal   | Price per unit at purchase time          |

## Business Rules

- Quantity must be at least 1.
- Price is captured at order time and may differ from current product price.

## Relationships

- Belongs to: Order, Product
