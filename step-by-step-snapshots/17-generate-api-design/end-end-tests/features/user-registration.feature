
# language: en
# GH Copilot code - starts
Feature: User Registration
  As a new user
  I want to register with my email, password, name, address, and phone number
  So that I can create an account on ShopSphere

  Background:
    Given the ShopSphere registration page is available

  @e2e
  Scenario: Successful registration with valid details and email verification required
    When I register with:
      | email        | alice.smith@example.com |
      | password     | Str0ngP@ssw0rd!        |
      | name         | Alice Smith            |
      | addressLine1 | 123 Main St            |
      | addressLine2 | Apt 4B                 |
      | city         | Springfield            |
      | state        | IL                     |
      | postalCode   | 62701                  |
      | country      | USA                    |
      | phoneNumber  | +1-555-123-4567        |
  Then I see a message "Please check your email to verify your account"
  And my account is created with role "Customer"
  And my account is created with status "Active"
  And my account creation timestamp is recorded
  And my account has emailVerified set to false
  And I cannot log in until email is verified

  Scenario: Successful email verification
    Given I have registered but not verified my email
    When I click the verification link in my email
  Then my account is activated
  And my account has emailVerified set to true
  And I am able to log in

  Scenario: Registration fails with already registered email
    Given the registration page is open
    And a user account exists with the email address "alice.smith@example.com"
    When I register with:
      | email        | alice.smith@example.com |
      | password     | AnotherP@ss1!          |
      | name         | Alice S.               |
      | addressLine1 | 456 Elm St             |
      | city         | Springfield            |
      | state        | IL                     |
      | postalCode   | 62702                  |
      | country      | USA                    |
      | phoneNumber  | +1-555-987-6543        |
    Then I see an error message "Email already registered"
    And my account is not created

  Scenario: Registration fails with invalid email format
    When I register with:
      | email        | alice.smith#example.com |
      | password     | Str0ngP@ssw0rd!        |
      | name         | Alice Smith            |
      | addressLine1 | 123 Main St            |
      | city         | Springfield            |
      | state        | IL                     |
      | postalCode   | 62701                  |
      | country      | USA                    |
      | phoneNumber  | +1-555-123-4567        |
  Then I see an error message "Invalid email format"
  And my account is not created

  Scenario: Registration fails with weak password - too short
    When I register with:
      | email        | bob.jones@example.com   |
      | password     | 12345                  |
      | name         | Bob Jones              |
      | addressLine1 | 789 Oak St             |
      | city         | Springfield            |
      | state        | IL                     |
      | postalCode   | 62703                  |
      | country      | USA                    |
      | phoneNumber  | +1-555-222-3333        |
  Then I see an error message "Password is too weak"
  And my account is not created

  Scenario: Registration fails with invalid password - no uppercase
    When I register with password "str0ngp@ssw0rd!"
  Then I see an error message "Password must contain at least one uppercase letter"

  Scenario: Registration fails with invalid name format
    When I register with name containing numbers "Alice123"
  Then I see an error message "Name must contain only letters and spaces"

  Scenario: Registration fails with missing required fields
    When I register with:
      | email        |                         |
      | password     | Str0ngP@ssw0rd!         |
      | name         |                         |
      | addressLine1 |                         |
      | city         |                         |
      | state        |                         |
      | postalCode   |                         |
      | country      |                         |
      | phoneNumber  |                         |
  Then I see an error message "All fields are required"
  And my account is not created

  Scenario: Registration fails with invalid phone number
    When I register with phone number "abc123"
  Then I see an error message "Invalid phone number"
  And my account is not created

  Scenario: Registration fails with phone number too short
    When I register with phone number "123"
  Then I see an error message "Phone number must be at least 10 digits"

  Scenario: Registration succeeds with international phone format
    When I register with phone number "+44-20-7946-0958"
  Then I see a confirmation message "Registration successful!"

  Scenario: Registration fails with address exceeding maximum length
    When I register with addressLine1 "A very long address that exceeds the maximum allowed length of 255 characters ............................................................................................................................................................................."
  Then I see an error message "Address is too long"
  And my account is not created

  Scenario: Registration succeeds with minimum valid password length
    When I register with:
      | email        | eve.martin@example.com  |
      | password     | Abcdef1!                |
      | name         | Eve Martin              |
      | addressLine1 | 654 Maple St            |
      | city         | Springfield             |
      | state        | IL                      |
      | postalCode   | 62704                   |
      | country      | USA                     |
      | phoneNumber  | +1-555-666-7777         |
  Then I see a confirmation message "Registration successful!"
  And my account is created with role "Customer"
  And my account is created with status "Active"
# GH Copilot code - end
