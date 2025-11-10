# Shipment

## Description

Represents the shipping details for an Order, including carrier, tracking, and delivery status.

## Attributes

| Attribute     | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| id            | UUID      | Unique identifier for the shipment       |
| orderId       | UUID      | Reference to the Order                   |
| addressId     | UUID      | Reference to the shipping Address        |
| carrier       | String    | Shipping carrier (e.g., FedEx, UPS)      |
| trackingNumber| String    | Carrier-provided tracking number         |
| status        | Enum      | Pending, Shipped, InTransit, Delivered, Returned |
| shippedAt     | DateTime  | Shipment sent timestamp                  |
| deliveredAt   | DateTime  | Delivery timestamp                       |
| createdAt     | DateTime  | Shipment creation timestamp              |

## Business Rules

- Each order can have only one shipment.
- Status must be updated as shipment progresses.
- Tracking number must be unique per carrier.

## Relationships

- Belongs to: Order, Address
