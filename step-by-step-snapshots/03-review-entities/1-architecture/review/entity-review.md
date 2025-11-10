# Entity Attribute Review: Serious Gaps and Flaws

This document lists critical issues in the current entity attribute definitions that may block or severely complicate implementation, compliance, or user experience. Use this as a reference for future data model improvements.

---

## 1. User Entity: Missing Phone Number
- **Requirement:** Registration/profile must include phone number.
- **Gap:** `User` entity has no `phoneNumber` attribute.
- **Impact:** Cannot collect or update user phone numbers, which may be required for notifications, security, or compliance.

---

## 2. User Entity: No Email Verification or Status Tracking
- **Requirement:** Email must be verified; support for account deletion/anonymization.
- **Gap:** No attribute for email verification status or timestamp; no attribute for marking user as deleted/anonymized.
- **Impact:** Cannot enforce verified accounts or comply with data privacy requirements.

---

## 3. Product Entity: No Stock Status or Low-Stock Alert
- **Requirement:** Display out-of-stock/low-stock alerts.
- **Gap:** `Product` has a `status` but no explicit `stockStatus` or low-stock threshold.
- **Impact:** Cannot easily implement low-stock alerts or display stock status to users.

---

## 4. Product Entity: No Support for Multiple Categories
- **Requirement:** Products can belong to multiple categories.
- **Gap:** Only a single `categoryId` is present.
- **Impact:** Cannot assign products to multiple categories or subcategories.

---

## 5. Order Entity: No Support for Order History/Status Tracking
- **Requirement:** Users must view order status history.
- **Gap:** Only a single `status` field; no order status history or timestamps for each status.
- **Impact:** Cannot provide a timeline of order progress or support downloadable order history.

---

## 6. Order Entity: No Estimated Delivery Date
- **Requirement:** Show estimated delivery date.
- **Gap:** No attribute for estimated delivery.
- **Impact:** Cannot display or update delivery estimates for users.

---

## 7. Payment Entity: No Support for Multiple Payment Methods per Order
- **Requirement:** Support split payments or multiple payment methods.
- **Gap:** Only a single `method` and `paymentId` per order.
- **Impact:** Cannot support partial payments or multiple payment types for a single order.

---

## 8. Promotion Entity: No Product/Category Association
- **Requirement:** Promotions may apply to specific products or categories.
- **Gap:** No attribute or relationship to link promotions to products or categories.
- **Impact:** Cannot restrict promotions to certain products/categories.

---

## 9. Review Entity: No Order Reference
- **Requirement:** Each user can review a product only once per order.
- **Gap:** No `orderId` in `Review` to enforce this rule.
- **Impact:** Cannot prevent duplicate reviews for the same product in the same order.

---

## 10. Inventory Entity: No Low-Stock Threshold
- **Requirement:** Notify sellers when stock falls below a threshold.
- **Gap:** No attribute for low-stock threshold.
- **Impact:** Cannot trigger low-stock notifications.

---

## 11. Session Entity: No Support for Social Login Sessions
- **Requirement:** Support for social login.
- **Gap:** No attribute to distinguish between local and social login sessions or to store provider info.
- **Impact:** Cannot track or manage social login sessions.

---

## 12. Address Entity: No Phone Number
- **Requirement:** Shipping address may require a phone number for delivery.
- **Gap:** No `phoneNumber` in `Address`.
- **Impact:** May cause delivery issues or non-compliance with shipping provider requirements.

---
