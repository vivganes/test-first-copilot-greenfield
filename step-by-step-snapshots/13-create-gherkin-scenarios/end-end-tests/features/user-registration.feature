# language: en
# GH Copilot code - starts
Feature: User Registration
  As a new user
  I want to register with my email, password, name, address, and phone number
  So that I can create an account on ShopSphere

  Background:
    Given the ShopSphere registration page is available

  Scenario: Successful registration with valid details
    When I register with email "alice.smith@example.com", password "Str0ngP@ssw0rd!", name "Alice Smith", address "123 Main St, Springfield", and phone number "+1-555-123-4567"
    Then I should see a confirmation message "Registration successful!"
    And my account should be created in the system

  Scenario: Registration fails with already registered email
    When I register with email "alice.smith@example.com", password "AnotherP@ss1!", name "Alice S.", address "456 Elm St, Springfield", and phone number "+1-555-987-6543"
    Then I should see an error message "Email already registered"
    And my account should not be created

  Scenario: Registration fails with invalid email format
    When I register with email "alice.smith#example.com", password "Str0ngP@ssw0rd!", name "Alice Smith", address "123 Main St, Springfield", and phone number "+1-555-123-4567"
    Then I should see an error message "Invalid email format"
    And my account should not be created

  Scenario: Registration fails with weak password
    When I register with email "bob.jones@example.com", password "12345", name "Bob Jones", address "789 Oak St, Springfield", and phone number "+1-555-222-3333"
    Then I should see an error message "Password is too weak"
    And my account should not be created

  Scenario: Registration fails with missing required fields
    When I register with email "", password "Str0ngP@ssw0rd!", name "", address "", and phone number ""
    Then I should see an error message "All fields are required"
    And my account should not be created

  Scenario: Registration fails with invalid phone number
    When I register with email "carol.lee@example.com", password "Str0ngP@ssw0rd!", name "Carol Lee", address "321 Pine St, Springfield", and phone number "abc123"
    Then I should see an error message "Invalid phone number"
    And my account should not be created

  Scenario: Registration fails with address exceeding maximum length
    When I register with email "dave.wilson@example.com", password "Str0ngP@ssw0rd!", name "Dave Wilson", address "A very long address that exceeds the maximum allowed length of 255 characters .............................................................................................................................................................................", and phone number "+1-555-444-5555"
    Then I should see an error message "Address is too long"
    And my account should not be created

  Scenario: Registration succeeds with minimum valid password length
    When I register with email "eve.martin@example.com", password "Abcdef1!", name "Eve Martin", address "654 Maple St, Springfield", and phone number "+1-555-666-7777"
    Then I should see a confirmation message "Registration successful!"
    And my account should be created in the system
# GH Copilot code - end
