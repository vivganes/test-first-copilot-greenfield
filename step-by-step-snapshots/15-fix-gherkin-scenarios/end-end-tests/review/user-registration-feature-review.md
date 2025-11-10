# User Registration Feature Review

**Review Date**: September 16, 2025  
**Feature File**: `end-end-tests/features/user-registration.feature`  
**User Story**: As a new user, I want to register with my email, password, name, address, and phone number so that I can create an account on ShopSphere.

## Overview

This document contains a critical review of the Gherkin feature file for user registration, identifying serious gaps between the requirements and the current test scenarios that will affect implementation.

## Critical Gaps and Flaws

### 1. Missing Email Verification Requirement
**Severity**: Critical  
**Requirement Reference**: UR-1.1, User Story #1  
**Issue**: The requirements specify that "a verification email is sent upon registration" and "the user can log in after verifying their email", but none of the scenarios test email verification functionality.

**Current Problem**: 
- Scenarios suggest users can immediately use their accounts without email verification
- Contradicts security requirements and user entity specification (`emailVerified` and `emailVerifiedAt` fields)

**Required Fix**:
- Add scenarios for email verification workflow
- Test successful email verification
- Test account restrictions before email verification
- Test resend verification email functionality

**Example Missing Scenarios**:
```gherkin
Scenario: Registration requires email verification
  When I register with valid details
  Then I should see a message "Please check your email to verify your account"
  And I should not be able to log in until email is verified

Scenario: Successful email verification
  Given I have registered but not verified my email
  When I click the verification link in my email
  Then my account should be activated
  And I should be able to log in
```

### 2. Missing Role Assignment During Registration
**Severity**: Critical  
**Requirement Reference**: UR-1.3, UserRole table in database schema  
**Issue**: The requirements specify role-based access (Customer, Seller, Admin), but no scenarios specify what role is assigned during registration.

**Current Problem**: 
- Without defining default role assignment, the registration process is incomplete
- UserRole table expects role assignment but scenarios don't verify this

**Required Fix**:
- Add explicit role assignment verification (likely "Customer" by default)
- Test that new users receive appropriate default permissions

**Example Missing Verification**:
```gherkin
Then my account should be created with role "Customer"
And I should have customer-level permissions
```

### 3. Address Data Structure Mismatch
**Severity**: High  
**Requirement Reference**: Address entity, database schema  
**Issue**: Address is treated as a single string field instead of structured components required by the system.

**Current Problem**: 
- Address entity requires: line1, line2, city, state, postalCode, country, type
- Database schema expects separate columns for address components
- Current scenarios use single string: "123 Main St, Springfield"

**Required Fix**:
- Replace single address field with structured address components
- Test validation for each address component
- Test address type assignment (Shipping/Billing)

**Example Corrected Scenario**:
```gherkin
When I register with:
  | email        | alice.smith@example.com |
  | password     | Str0ngP@ssw0rd!        |
  | name         | Alice Smith            |
  | addressLine1 | 123 Main St           |
  | city         | Springfield           |
  | state        | IL                    |
  | postalCode   | 62701                |
  | country      | USA                   |
  | phoneNumber  | +1-555-123-4567      |
```

### 4. Missing User Status and Account State Management
**Severity**: High  
**Requirement Reference**: User entity status field, User Story #1  
**Issue**: No scenarios verify the initial account status or state management.

**Current Problem**: 
- User entity specifies status (Active, Inactive, Suspended)
- User story mentions account status 'Active' upon registration
- Scenarios don't confirm accounts are created in correct initial state

**Required Fix**:
- Add verification of account status in successful registration scenarios
- Test account state transitions

**Example Missing Verification**:
```gherkin
Then my account should be created with status "Active"
And my account creation timestamp should be recorded
```

### 5. Incomplete Data Validation Coverage
**Severity**: High  
**Requirement Reference**: User entity mandatory fields  
**Issue**: Missing validation for several mandatory fields and insufficient validation testing.

**Current Problems**:
- No specific password complexity requirements (beyond generic "weak password")
- No name field validation testing (empty string scenario exists but no format validation)
- No comprehensive phone number format validation requirements
- Missing email uniqueness constraint testing with edge cases

**Required Fix**:
- Add specific validation scenarios for all required fields
- Define clear acceptance criteria for each validation rule
- Test edge cases for all input fields

**Example Missing Scenarios**:
```gherkin
Scenario: Registration fails with invalid password - no uppercase
  When I register with password "str0ngp@ssw0rd!"
  Then I should see an error message "Password must contain at least one uppercase letter"

Scenario: Registration fails with invalid name format
  When I register with name containing numbers "Alice123"
  Then I should see an error message "Name must contain only letters and spaces"
```

### 6. Missing Independent Test Scenario Setup
**Severity**: Medium-High  
**Requirement Reference**: Gherkin best practices  
**Issue**: Background only checks page availability but doesn't ensure clean test state.

**Current Problem**: 
- Tests may not be truly independent if user data persists between scenarios
- No proper test data cleanup or unique data generation

**Required Fix**:
- Add proper test data cleanup in Background
- Ensure each scenario uses unique test data
- Add database state verification

**Example Improved Background**:
```gherkin
Background:
  Given the ShopSphere registration page is available
  And the test database is in a clean state
  And no user exists with email used in this scenario
```

### 7. Incomplete Phone Number Validation
**Severity**: Medium  
**Requirement Reference**: UR-1.1, User entity phoneNumber field  
**Issue**: Phone number is mandatory but validation criteria are unclear and undertested.

**Current Problem**: 
- Only tests obviously invalid input ("abc123")
- No testing of format requirements, length limits, or international formats
- Address entity also requires phone number for delivery compliance

**Required Fix**:
- Define specific phone number format requirements
- Test various phone number formats (domestic, international)
- Test edge cases (too short, too long, invalid characters)

**Example Missing Scenarios**:
```gherkin
Scenario: Registration fails with phone number too short
  When I register with phone number "123"
  Then I should see an error message "Phone number must be at least 10 digits"

Scenario: Registration succeeds with international phone format
  When I register with phone number "+44-20-7946-0958"
  Then I should see a confirmation message "Registration successful!"
```

## Additional Considerations

### Database Integration Testing
- Scenarios should verify actual database persistence
- Test database constraints and triggers
- Verify foreign key relationships

### Security Testing Gaps
- No testing of SQL injection prevention in input fields
- No testing of password hashing (should not store plain text)
- No CSRF protection testing

### Integration Points Missing
- No testing of email service integration for verification emails
- No testing of notification service for welcome messages
- No testing of audit logging for registration events

## Recommendations for Implementation

1. **Priority 1 (Critical)**: Address email verification workflow and role assignment
2. **Priority 2 (High)**: Fix address data structure and add comprehensive validation
3. **Priority 3 (Medium)**: Improve test independence and add missing edge cases

## Files Referenced in Review

- `0-requirements/requirements.md` - Overall system requirements
- `0-requirements/user-stories/user-management.md` - Specific user story details  
- `1-architecture/0-system-context.md` - System context
- `1-architecture/Entities/User.md` - User entity specification
- `1-architecture/Entities/Address.md` - Address entity specification
- `db/tables.sql` - Database schema definitions

---

*This review focuses on serious flaws that will affect implementation. Minor suggestions and optional improvements have been excluded as requested.*