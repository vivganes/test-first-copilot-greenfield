# Inventory

## Description

Tracks the stock levels of products in ShopSphere. Each product has an associated inventory record to manage available quantities and restocking.

## Attributes

| Attribute     | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| id            | UUID      | Unique identifier for the inventory      |
| productId     | UUID      | Reference to Product                     |
| quantity      | Integer   | Number of items in stock                 |
| reserved      | Integer   | Number of items reserved (in carts)      |
| updatedAt     | DateTime  | Last update timestamp                    |

## Business Rules

- Quantity must be zero or positive.
- Reserved cannot exceed quantity.
- Inventory must be updated on order placement and cancellation.

## Relationships

- Belongs to: Product
