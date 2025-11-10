# RolePermission

## Description

Defines roles (such as Customer, Seller, Admin) and their associated permissions, controlling access to system features and data.

## Attributes

| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the role/permission   |
| role        | Enum      | Role name: Customer, Seller, Admin          |
| permission  | String    | Permission name (e.g., view_orders)         |
| description | String    | Description of the permission               |

## Business Rules

- Roles determine access to system features.
- Permissions can be assigned to multiple roles.
- Users inherit permissions from their assigned role.

## Relationships

- Has many: User
