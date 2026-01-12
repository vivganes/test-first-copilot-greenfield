# Shopping Cart Service

## Description
The Shopping Cart Service manages users' shopping carts, including adding/removing products, persisting cart state, and validating stock before checkout. It ensures each user has only one active cart and handles cart expiration and clearing after order placement.

## Communication
- Communicates with: User Service, Product Service, Inventory Service, API Gateway, Storefront UI.