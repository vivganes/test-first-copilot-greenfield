# Currency

## Description

Represents supported currencies and their exchange rates for multi-currency transactions in ShopSphere.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| code        | String    | ISO currency code (e.g., USD, EUR)          |
| name        | String    | Currency name                               |
| symbol      | String    | Currency symbol (e.g., $, €)                |
| exchangeRate| Decimal   | Exchange rate relative to base currency     |
| isActive    | Boolean   | Whether the currency is enabled             |
| updatedAt   | DateTime  | Last update timestamp                       |

## Business Rules

- Only active currencies can be used for transactions.
- Exchange rates must be updated regularly.
- One base currency is defined for the system.

## Relationships

- Used by: Order, Payment
