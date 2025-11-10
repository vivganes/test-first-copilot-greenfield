# Promotion

## Description

Represents discounts, coupons, or special offers that can be applied to products or orders to incentivize purchases.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the promotion         |
| code        | String    | Promotion or coupon code                    |
| description | String    | Description of the promotion                |
| discountType| Enum      | Percentage, FixedAmount                     |
| discountValue| Decimal  | Value of the discount                       |
| startDate   | DateTime  | Promotion start date                        |
| endDate     | DateTime  | Promotion end date                          |
| usageLimit  | Integer   | Maximum number of uses                      |
| usedCount   | Integer   | Number of times used                        |
| status      | Enum      | Active, Inactive, Expired                   |

## Business Rules

- Promotion code must be unique.
- Usage cannot exceed usage limit.
- Only active promotions can be applied.

## Relationships

- Can apply to: Product, Order
