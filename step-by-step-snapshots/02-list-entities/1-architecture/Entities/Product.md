# Product

## Description

Represents an item listed for sale on ShopSphere. Products are managed by Sellers and can belong to one or more Categories. Each product contains details such as price, description, and inventory status.

## Attributes

| Attribute     | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| id            | UUID      | Unique identifier for the product        |
| name          | String    | Product name                             |
| description   | String    | Detailed product description             |
| price         | Decimal   | Current price                            |
| categoryId    | UUID      | Reference to Category                    |
| sellerId      | UUID      | Reference to Seller (User)               |
| inventoryId   | UUID      | Reference to Inventory                   |
| status        | Enum      | Active, Inactive, OutOfStock             |
| createdAt     | DateTime  | Product creation timestamp               |
| updatedAt     | DateTime  | Last update timestamp                    |

## Business Rules

- Price must be non-negative.
- Product must belong to at least one Category.
- Only Sellers can create or update products.
- Product status reflects availability.

## Relationships

- Belongs to: Category, Seller (User), Inventory
- Has many: Review, Promotion, OrderItem
