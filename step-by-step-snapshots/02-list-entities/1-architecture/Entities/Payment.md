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

## Business Rules

- Payment amount must match the order total.
- Status must reflect actual payment processing state.
- Refunds must be tracked and auditable.

## Relationships

- Belongs to: Order
