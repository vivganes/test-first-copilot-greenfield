# Order

## Description

Represents a purchase transaction made by a Customer. An order contains one or more items, payment, shipping, and status information.

## Attributes

| Attribute     | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| id            | UUID      | Unique identifier for the order          |
| userId        | UUID      | Reference to Customer (User)             |
| status        | Enum      | Pending, Paid, Shipped, Delivered, Cancelled, Refunded |
| totalAmount   | Decimal   | Total order amount                       |
| paymentId     | UUID      | Reference to Payment                     |
| shipmentId    | UUID      | Reference to Shipment                    |
| createdAt     | DateTime  | Order creation timestamp                 |
| updatedAt     | DateTime  | Last update timestamp                    |

## Business Rules

- Orders must have at least one OrderItem.
- Status transitions must follow business workflow.
- Total amount must match sum of OrderItems and applied promotions.

## Relationships

- Belongs to: User, Payment, Shipment
- Has many: OrderItem
