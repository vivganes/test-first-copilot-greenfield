# ProductImage

## Description
Associates images with products and variants for display in the catalog and product pages.

## Attributes
| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the image             |
| productId   | UUID      | Reference to the Product                    |
| variantId   | UUID      | Reference to ProductVariant (optional)      |
| url         | String    | Image URL or path                           |
| altText     | String    | Alt text for accessibility                  |
| sortOrder   | Integer   | Display order                               |
| createdAt   | DateTime  | Image upload timestamp                      |

## Business Rules
- Each product can have multiple images.
- Images can be associated with a specific variant or the base product.

## Relationships
- Belongs to: Product, ProductVariant (optional)
