# Missing Entities and Major Data Model Gaps

This document lists critical missing entities and relationships in the current data model, based on requirements. These gaps may block or severely complicate implementation, compliance, or user experience. Use this as a reference for future entity additions.

---

## 1. Product Variants and SKU Support
- **Requirement:** Products must support variants (e.g., size, color) with unique SKUs.
- **Gap:** No entity or structure for product variants or SKUs.
- **Impact:** Cannot implement variant selection, inventory tracking per variant, or unique pricing per SKU.

---

## 2. Product Images
- **Requirement:** Products must display images.
- **Gap:** No entity or attribute for product images.
- **Impact:** Cannot associate or display product images.

---

## 3. Brand
- **Requirement:** Product search/filter by brand.
- **Gap:** No `Brand` entity or brand attribute in `Product`.
- **Impact:** Cannot implement brand-based filtering or display.

---

## 4. Downloadable Invoices
- **Requirement:** Order history must support downloadable invoices.
- **Gap:** No entity or attribute for storing or generating invoices.
- **Impact:** Cannot provide downloadable invoices to users.

---

## 5. Customer Support Tickets
- **Requirement:** Ticket system for admins to track and resolve customer issues.
- **Gap:** No entity for support tickets or their status.
- **Impact:** Cannot implement structured customer support or ticket tracking.

---

## 6. FAQ and Contact Form Submissions
- **Requirement:** FAQ page and contact form for customer inquiries.
- **Gap:** No entity for FAQ entries or for storing contact form submissions.
- **Impact:** Cannot manage FAQs or track customer inquiries.

---

## 7. Social Login
- **Requirement:** Optional social login.
- **Gap:** No entity or attribute to track social login providers or external IDs.
- **Impact:** Cannot support or audit social login accounts.

---

## 8. Password Recovery/Reset
- **Requirement:** Password recovery via email with secure reset link.
- **Gap:** No entity or attribute for password reset tokens or their expiration.
- **Impact:** Cannot securely implement password reset flows.

---

## 9. Data Retention/Anonymization
- **Requirement:** Account deletion with data retention/anonymization.
- **Gap:** No entity or attribute for marking users for deletion or anonymizing data after 30 days.
- **Impact:** Non-compliance with GDPR/CCPA and data privacy requirements.

---

## 10. Promotional Banners
- **Requirement:** Display promotional banners on homepage during events.
- **Gap:** No entity for managing banners or their scheduling.
- **Impact:** Cannot automate or manage promotional banners.

---

## 11. Bulk Discounts
- **Requirement:** Bulk discounts (e.g., buy X, get Y% off).
- **Gap:** `Promotion` entity does not support rules for bulk/quantity-based discounts.
- **Impact:** Cannot implement quantity-based promotions.

---

## 12. Partial Shipments
- **Requirement:** Handle partial shipments for orders with multiple sellers.
- **Gap:** No support for splitting shipments or associating multiple sellers per order.
- **Impact:** Cannot support marketplace scenarios or partial fulfillment.

---

## 13. Audit of Refunds/Disputes
- **Requirement:** Admins must manage refunds and disputes.
- **Gap:** No clear audit trail or dispute resolution process for refunds.
- **Impact:** May not meet compliance or traceability requirements for financial operations.

---

## 14. Shopping Cart Items
- **Requirement:** Cart must contain products and quantities.
- **Gap:** `ShoppingCartItem` is mentioned but not defined as an entity.
- **Impact:** Cannot model cart contents, promotions per item, or support cart operations.

---

## 15. Product Search/Filter Metadata
- **Requirement:** Search with filters (e.g., tags, attributes).
- **Gap:** No entity or attribute for filterable metadata.
- **Impact:** Cannot implement advanced search/filtering.

---
