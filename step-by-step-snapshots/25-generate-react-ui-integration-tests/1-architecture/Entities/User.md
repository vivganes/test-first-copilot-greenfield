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

| phoneNumber     | String    | User's phone number (required for registration/profile) |
| emailVerified   | Boolean   | Whether the email is verified             |
| emailVerifiedAt | DateTime  | Timestamp of email verification           |
| deletedAt       | DateTime  | Timestamp when user requested deletion    |
| anonymized      | Boolean   | Whether user data is anonymized (GDPR/CCPA) |


## Business Rules

- Email must be unique and verified; emailVerified and emailVerifiedAt must be set after verification.
- Phone number is required for registration/profile.
- Passwords must be securely hashed.
- Role determines access permissions.
- Users can have multiple addresses.
- Sellers and Admins require additional verification.
- Users can request account deletion; deletedAt is set and data is anonymized after 30 days (GDPR/CCPA compliance).

## Relationships

- Has many: Address, Order, Review, ShoppingCart, Notification
- Belongs to: RolePermission

## Compliance
- Supports account deletion and anonymization for data privacy (GDPR/CCPA).
