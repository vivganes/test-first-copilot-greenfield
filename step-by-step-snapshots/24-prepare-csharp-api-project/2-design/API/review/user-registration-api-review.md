# User Registration API Design Review

**Date:** September 18, 2025  
**Reviewer:** GitHub Copilot  
**Scope:** User Registration API Design (`user-registration-openapi.yaml`)  
**Context:** ShopSphere E-Commerce System

## Executive Summary

This review identifies **7 critical and high-severity gaps** between the requirements, database schema, test scenarios, and the current API design for user registration. These gaps could lead to significant implementation delays and architectural inconsistencies if not addressed before development begins.

## Review Methodology

The review was conducted by analyzing:
- Business requirements (`0-requirements/requirements.md`)
- User stories (`0-requirements/user-stories/user-management.md`)
- Database schema (`db/tables.sql`)
- Gherkin test scenarios (`end-end-tests/features/user-registration.feature`)
- Implementation assumptions (`end-end-tests/pages/` and `end-end-tests/steps/`)
- Entity definitions (`1-architecture/Entities/`)
- Current API design (`2-design/API/user-registration-openapi.yaml`)

## Critical Findings

### 1. **Missing Address Separation in API Design**
**Severity: Critical**

**Issue:** The API design treats address as inline fields within the user registration, but the database schema has a separate `Address` table with a foreign key relationship.

**Current API Design:**
```yaml
properties:
  addressLine1:
    type: string
  addressLine2:
    type: string
  city:
    type: string
  # ... other inline address fields
```

**Database Reality:**
```sql
CREATE TABLE Address (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('Shipping','Billing')),
    line1 TEXT NOT NULL,
    -- ... other fields
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);
```

**Impact:** Implementation will need complex logic to split the registration data and create two separate database records atomically. This mismatch could lead to data integrity issues.

**Recommendation:** Restructure the API to have separate `user` and `address` objects or clearly document the expected data transformation.

### 2. **Missing UserRole Table Handling**
**Severity: Critical**

**Issue:** The API response includes `role: "Customer"` but the database uses a separate `UserRole` table with a many-to-many relationship.

**Database Schema:**
```sql
CREATE TABLE UserRole (
    userId TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('Customer','Seller','Admin')),
    PRIMARY KEY (userId, role),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);
```

**API Response:**
```yaml
role:
  type: string
  example: Customer
```

**Impact:** Implementation must create entries in both `User` and `UserRole` tables, but the API doesn't reflect this complexity. This could lead to users without proper role assignments.

**Recommendation:** Either modify the API to reflect the many-to-many relationship or document the automatic role assignment behavior.

### 3. **Missing Address Type and Default Flag Logic**
**Severity: High**

**Issue:** The database `Address` table requires `type` field (CHECK constraint: 'Shipping' or 'Billing') and `isDefault` boolean field, but the API doesn't specify these.

**Database Requirements:**
- `type TEXT NOT NULL CHECK(type IN ('Shipping','Billing'))`
- `isDefault INTEGER NOT NULL DEFAULT 0`

**API Gap:** No specification for:
- Which address type(s) to create during registration
- Whether this should be set as the default address

**Impact:** Implementation will have to make assumptions about business logic not defined in the API.

**Recommendation:** Add address type specification and default flag logic to the API design.

### 4. **Incomplete Validation Rules**
**Severity: High**

**Issue:** The Gherkin scenarios define specific validation rules that are missing from the API schema.

**Missing Constraints:**
- **Name validation:** Letters and spaces only (Scenario: "Alice123" should fail)
- **Password complexity:** Beyond minimum length (uppercase requirement)
- **Phone number validation:** Minimum 10 digits, proper format
- **Address length limits:** Maximum 255 characters per test scenarios

**Current API Validation:**
```yaml
email:
  type: string
  format: email
password:
  type: string
  format: password
  minLength: 8
```

**Test Scenario Examples:**
```gherkin
Scenario: Registration fails with invalid name format
  When I register with name containing numbers "Alice123"
  Then I see an error message "Name must contain only letters and spaces"

Scenario: Registration fails with invalid password - no uppercase
  When I register with password "str0ngp@ssw0rd!"
  Then I see an error message "Password must contain at least one uppercase letter"
```

**Impact:** API consumers won't have complete validation specifications, leading to inconsistent client-side validation and unexpected server errors.

**Recommendation:** Complete the validation rules in the OpenAPI schema to match all Gherkin scenarios.

### 5. **Missing Transaction Boundary Specification**
**Severity: High**

**Issue:** Registration involves creating records in multiple tables (User, UserRole, Address) but the API doesn't specify atomicity requirements.

**Database Operations Required:**
1. Insert into `User` table
2. Insert into `UserRole` table
3. Insert into `Address` table
4. Generate email verification token

**Failure Scenarios:**
- User created but role assignment fails
- User and role created but address creation fails
- Orphaned records if process fails midway

**Impact:** Without clear transaction boundaries, partial failures could leave the system in an inconsistent state.

**Recommendation:** Define transaction boundaries and rollback behavior in the API specification.

### 6. **Inconsistent Phone Number Handling**
**Severity: Medium-High**

**Issue:** Unclear phone number storage strategy between User and Address entities.

**Database Schema:**
- `User.phoneNumber` is NOT NULL (required)
- `Address.phoneNumber` is optional but recommended for delivery

**Test Scenarios:** Expect the phone number from registration to work for delivery, suggesting it should be stored in both places.

**API Gap:** Doesn't specify:
- Where the phone number should be stored
- If it should be duplicated in both User and Address tables
- Synchronization requirements

**Impact:** Implementation team has to guess the phone number storage strategy.

**Recommendation:** Clarify phone number storage strategy and specify which tables should receive the phone number data.

### 7. **Missing Email Verification Token Management**
**Severity: Medium**

**Issue:** The API has `/users/verify-email` endpoint expecting a `token`, but lacks token management specifications.

**Missing Specifications:**
- Token generation mechanism during registration
- Token storage strategy (database table, cache, etc.)
- Token expiration handling (24-hour requirement from user stories)
- Token format and security considerations

**Current API:**
```yaml
/users/verify-email:
  post:
    requestBody:
      properties:
        token:
          type: string  # No further specification
```

**Impact:** Implementation team has to design the entire email verification flow from scratch.

**Recommendation:** Add token management endpoints and specify the complete email verification workflow.

## Summary of Recommendations

### Immediate Actions Required:
1. **Restructure registration API** to separate user and address data
2. **Add explicit UserRole handling** in API specification  
3. **Define address type and default logic** in request schema
4. **Complete validation rules** to match test scenarios
5. **Specify transaction boundaries** and error handling
6. **Clarify phone number storage** strategy
7. **Add email verification token** management specification

### Impact Assessment:
- **Without fixes:** High risk of implementation delays, data integrity issues, and architectural inconsistencies
- **With fixes:** Clear implementation path aligned with database schema and business requirements

## Conclusion

The current API design has significant gaps that could lead to implementation challenges. The most critical issues are the misalignment between the API's flat structure and the database's relational design, along with incomplete validation specifications. These issues should be resolved before development begins to ensure a smooth implementation process.