# ShopSphere DB Tables Schema Review

_Last reviewed: 2025-09-15_

This document lists **serious flaws** identified in the current `tables.sql` database schema, based on requirements, system context, and entity definitions. These issues must be addressed to ensure correct implementation and future extensibility.

---

## 1. Product-Category Relationship
- **Flaw:** The `Product` table has a `categoryId` (one-to-many), but the entity and requirements specify that products can belong to multiple categories (many-to-many).
- **Impact:** Prevents correct product categorization, filtering, and search. The presence of both `categoryId` and a `ProductCategory` join table can cause data inconsistency.

## 2. ProductVariant and Inventory
- **Flaw:** `ProductVariant` has an optional `inventoryId`, but inventory must be tracked per variant. The schema allows variants without inventory, which can break stock management.
- **Impact:** Variants without inventory records can cause overselling or incorrect stock status.

## 3. OrderItem and ProductVariant
- **Flaw:** `OrderItem` does not reference `ProductVariant`, only `Product`.
- **Impact:** Orders for specific variants (e.g., size/color) cannot be tracked, which is critical for fulfillment and analytics.

## 4. Currency and Tax Application
- **Flaw:** No reference to `Currency` or `Tax` in `Order` or `Payment` tables.
- **Impact:** Cannot support multi-currency orders or apply correct taxes per order, violating requirements for regional compliance and multi-currency support.

## 5. Bulk/Complex Promotion Rules
- **Flaw:** The `Promotion` table stores `productIds`, `categoryIds`, and `bulkRule` as JSON/text, but there are also join tables (`ProductPromotion`, `CategoryPromotion`). This duplication can cause inconsistency and makes querying promotions inefficient and error-prone.
- **Impact:** Promotion application logic will be unreliable and hard to maintain.

## 6. OrderItem Price Integrity
- **Flaw:** `OrderItem` does not store applied promotions/discounts or tax per item.
- **Impact:** Cannot reconstruct order totals, audit discounts, or handle partial refunds accurately.

## 7. User Role/Permission Model
- **Flaw:** The `User` table has a single `role` field, but the requirements and entity model suggest a more flexible permission system (users may have multiple roles/permissions).
- **Impact:** Limits future extensibility (e.g., a user who is both a Seller and a Customer).

## 8. Session and Social Login
- **Flaw:** The `Session` table supports social login, but there is no unique constraint to prevent multiple active sessions per user/device, as suggested in the entity rules.
- **Impact:** May allow session duplication, which can cause security and UX issues.

## 9. Data Privacy and Anonymization
- **Flaw:** The `User` table has `anonymized` and `deletedAt`, but there is no mechanism to cascade anonymization to related data (e.g., orders, reviews) as required for GDPR/CCPA.
- **Impact:** Data privacy compliance cannot be guaranteed.

## 10. Order/Shipment for Multi-Seller Orders
- **Flaw:** The schema does not support splitting a single order into multiple shipments for orders containing products from multiple sellers.
- **Impact:** Cannot fulfill the requirement for partial shipments and multi-seller order management.

---

_This list covers all critical gaps as of the review date. Addressing these is essential for a robust, compliant, and extensible database design._
