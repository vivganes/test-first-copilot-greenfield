# Tax

## Description

Represents tax rates and rules applied to products and orders, supporting compliance with regional tax regulations.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the tax rule          |
| name        | String    | Tax name (e.g., VAT, Sales Tax)             |
| rate        | Decimal   | Tax rate as a percentage                    |
| country     | String    | Country where the tax applies               |
| region      | String    | State/region where the tax applies          |
| isActive    | Boolean   | Whether the tax rule is active              |
| createdAt   | DateTime  | Tax rule creation timestamp                 |
| updatedAt   | DateTime  | Last update timestamp                       |

## Business Rules

- Only one active tax rule per region and tax type.
- Tax rates must be non-negative.
- Taxes are calculated at checkout based on shipping/billing address.

## Relationships

- Applied to: Product, Order
