# System Context Diagram: ShopSphere E-Commerce System

This document describes the system context for ShopSphere, following the C4 Model. It identifies the key external actors and systems that interact with ShopSphere and summarizes their relationships.

## System Overview

**ShopSphere** is a scalable, user-friendly e-commerce platform supporting online retail operations, including product catalog, shopping cart, checkout, user accounts, promotions, reviews, and analytics.

## External Actors and Systems

| External Entity             | Interaction with ShopSphere                                  |
|----------------------------|--------------------------------------------------------------|
| **Customer**               | Uses web/mobile app to browse, purchase, and review products |
| **Seller**                 | Manages products and views sales via dashboard               |
| **Admin**                  | Manages users, products, orders, and analytics               |
| **Payment Gateway**        | Processes payments (e.g., Stripe, PayPal) via API            |
| **Shipping Provider**      | Provides shipping rates and tracking (e.g., FedEx, UPS)      |
| **Social Login Provider**  | Authenticates users (e.g., Google, Facebook)                 |
| **Email Service Provider** | Sends transactional emails (e.g., SendGrid)                  |
| **Analytics Tools**        | Monitors traffic and sales (e.g., Google Analytics)          |
| **Fraud Detection Service**| Flags suspicious activities via API                          |
| **Compliance APIs**        | Calculates taxes, currency rates via API                     |

## Data Stores

- **Database**: Stores users, products, orders, etc.
- **Cache/CDN**: Used for performance and scalability.

## Relationships

- **Customers, Sellers, Admins** interact with ShopSphere via web/mobile UI.
- **ShopSphere** communicates with external systems via APIs for payments, shipping, authentication, email, analytics, fraud detection, and compliance.
- **ShopSphere** stores and retrieves data from its internal database and cache.

## System Boundary

ShopSphere is the system of interest. All other entities are external actors or systems.

## Visual Representation (Textual)

```
+-------------------+         +---------------------+
|    Customer       |<------->|                     |
+-------------------+         |                     |
+-------------------+         |                     |
|    Seller         |<------->|    ShopSphere       |<-------> Payment Gateway
+-------------------+         |    (System)         |<-------> Shipping Provider
+-------------------+         |                     |<-------> Social Login Provider
|    Admin          |<------->|                     |<-------> Email Service Provider
+-------------------+         |                     |<-------> Analytics Tools
                              |                     |<-------> Fraud Detection Service
                              |                     |<-------> Compliance APIs
                              +---------------------+
```

## Notes

- ShopSphere must handle high-traffic events, secure transactions, and real-time integrations with external services.
- All external systems are assumed to provide secure, reliable APIs.
