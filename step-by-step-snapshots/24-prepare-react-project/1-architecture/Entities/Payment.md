# Payment

## Description

Represents payment information and status for an Order. Payments are processed via external payment gateways.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the payment           |
| orderId     | UUID      | Reference to the Order                      |
| amount      | Decimal   | Payment amount                              |
| method      | Enum      | Payment method (e.g., CreditCard, PayPal)   |
| status      | Enum      | Pending, Completed, Failed, Refunded        |
| transactionId | String  | External payment gateway transaction ID     |
| createdAt   | DateTime  | Payment creation timestamp                  |
| updatedAt   | DateTime  | Last update timestamp                       |

| split       | Boolean   | True if this payment is part of a split payment |
| methods     | JSON      | Array of payment methods used (for split payments) |


## Business Rules

- Payment amount(s) must match the order total (supporting split payments).
- Status must reflect actual payment processing state.
- Refunds must be tracked and auditable.
- Multiple payment methods per order are supported via split and methods fields.

## Relationships

- Belongs to: Order
