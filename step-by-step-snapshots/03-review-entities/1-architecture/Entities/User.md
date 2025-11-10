# User

## Description

Represents any person who interacts with ShopSphere, including Customers, Sellers, and Admins. Users can browse products, make purchases, manage stores, or administer the platform depending on their role.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the user              |
| name        | String    | Full name of the user                       |
| email       | String    | Email address (unique)                      |
| password    | String    | Hashed password                             |
| role        | Enum      | User role: Customer, Seller, Admin          |
| status      | Enum      | Active, Inactive, Suspended                 |
| createdAt   | DateTime  | Account creation timestamp                  |
| updatedAt   | DateTime  | Last update timestamp                       |
| lastLogin   | DateTime  | Last login timestamp                        |

## Business Rules

- Email must be unique and verified.
- Passwords must be securely hashed.
- Role determines access permissions.
- Users can have multiple addresses.
- Sellers and Admins require additional verification.

## Relationships

- Has many: Address, Order, Review, ShoppingCart, Notification
- Belongs to: RolePermission
