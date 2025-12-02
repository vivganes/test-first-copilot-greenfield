# ReturnRefund

## Description

Represents a request to return a product and/or receive a refund for an order. Managed according to the shop's return policy.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the return/refund     |
| orderId     | UUID      | Reference to the Order                      |
| userId      | UUID      | Reference to the User (Customer)            |
| productId   | UUID      | Reference to the Product                    |
| quantity    | Integer   | Number of items being returned              |
| reason      | String    | Reason for return                           |
| status      | Enum      | Requested, Approved, Rejected, Completed    |
| refundAmount| Decimal   | Amount to be refunded                       |
| createdAt   | DateTime  | Request creation timestamp                  |
| updatedAt   | DateTime  | Last update timestamp                       |

## Business Rules

- Returns must comply with the return policy.
- Refund amount cannot exceed original payment.
- Status must reflect the return/refund process.

## Relationships

- Belongs to: Order, User, Product
