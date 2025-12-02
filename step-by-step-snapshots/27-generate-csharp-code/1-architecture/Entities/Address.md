# Address

## Description

Represents a physical address used for shipping or billing purposes. Each user can have multiple addresses stored for convenience during checkout.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the address           |
| userId      | UUID      | Reference to the User                       |
| type        | Enum      | Shipping, Billing                           |
| line1       | String    | Street address line 1                       |
| line2       | String    | Street address line 2 (optional)            |
| city        | String    | City                                        |
| state       | String    | State or province                           |
| postalCode  | String    | Postal or ZIP code                          |
| country     | String    | Country                                     |
| isDefault   | Boolean   | Whether this is the default address         |
| createdAt   | DateTime  | Address creation timestamp                  |
| updatedAt   | DateTime  | Last update timestamp                       |

| phoneNumber | String    | Phone number for delivery (optional, but recommended) |


## Business Rules

- Each user can have multiple addresses, but only one default per type.
- Address must be valid and complete for shipping.
- Phone number is required for shipping compliance in some regions.
- Users can update or delete their addresses.

## Relationships

- Belongs to: User
- Used by: Order, Shipment
