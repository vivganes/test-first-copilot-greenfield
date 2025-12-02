# ProductVariant

## Description
Represents a specific variant of a product (e.g., size, color), each with a unique SKU and inventory.

## Attributes
| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the variant           |
| productId   | UUID      | Reference to the Product                    |
| sku         | String    | Unique SKU for this variant                 |
| attributes  | JSON      | Variant attributes (e.g., size, color)      |
| price       | Decimal   | Price for this variant (optional)           |
| inventoryId | UUID      | Reference to Inventory                      |
| status      | Enum      | Active, Inactive, OutOfStock                |
| createdAt   | DateTime  | Variant creation timestamp                  |
| updatedAt   | DateTime  | Last update timestamp                       |

## Business Rules
- Each variant must have a unique SKU.
- Inventory is tracked per variant.
- Variants inherit product attributes unless overridden.

## Relationships
- Belongs to: Product, Inventory
