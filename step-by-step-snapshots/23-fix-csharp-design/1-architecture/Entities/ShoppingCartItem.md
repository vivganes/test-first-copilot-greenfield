# ShoppingCartItem

## Description
Represents an item in a user's shopping cart, including product, variant, and quantity.

## Attributes
| Attribute     | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| id            | UUID      | Unique identifier for the cart item      |
| cartId        | UUID      | Reference to ShoppingCart                |
| productId     | UUID      | Reference to Product                     |
| variantId     | UUID      | Reference to ProductVariant (optional)   |
| quantity      | Integer   | Number of units added                    |
| price         | Decimal   | Price per unit at time of addition       |
| promotionId   | UUID      | Reference to applied Promotion (optional)|
| addedAt       | DateTime  | Timestamp when item was added            |

## Business Rules
- Quantity must be at least 1.
- Price is captured at time of addition.

## Relationships
- Belongs to: ShoppingCart, Product, ProductVariant (optional), Promotion (optional)
