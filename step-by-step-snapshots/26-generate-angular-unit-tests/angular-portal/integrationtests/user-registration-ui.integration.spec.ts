// GH Copilot code - starts
/**
 * Integration test for User Registration UI (Angular)
 * This file contains e2e tests for the user registration flow, covering positive, negative, and corner cases.
 * The tests use Playwright to interact with the full UI and mock backend responses as per the API spec.
 *
 * API Spec: 2-design/API/user-registration-openapi.yaml
 * Components: UserRegistrationComponent, RegistrationFormComponent, AddressInputComponent, PhoneInputComponent, RegistrationErrorComponent, RegistrationSuccessComponent
 * Sequence: 2-design/Diagrams/angular-portal/Sequence/user-registration-sequence.mmd
 */

import { test, expect } from '@playwright/test';

// Utility to mock API responses
const mockApi = async (page, route, response) => {
  await page.route(route, async (route) => {
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body),
    });
  });
};

test.describe('User Registration UI Integration', () => {
  test('should register user successfully with valid data', async ({ page }) => {
    // Mock successful registration response
    await mockApi(page, '**/api/v1/users/register', {
      status: 201,
      body: {
        message: 'Please check your email to verify your account',
        userId: 'user-123',
        emailVerified: false,
        status: 'Active',
        role: 'Customer',
      },
    });

    // Go to registration page
    await page.goto('/register');

    // Fill form with valid data
    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.fill('input[name="password"]', 'ValidPass1!');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="phoneNumber"]', '+12345678901');
    await page.fill('input[name="address.line1"]', '123 Main St');
    await page.fill('input[name="address.city"]', 'Metropolis');
    await page.fill('input[name="address.state"]', 'State');
    await page.fill('input[name="address.postalCode"]', '12345');
    await page.fill('input[name="address.country"]', 'Country');
    await page.check('input[name="address.isDefault"]');
    await page.click('button[type="submit"]');

    // Expect success message and UI update
    await expect(page.getByText('Please check your email to verify your account')).toBeVisible();
    await expect(page.getByTestId('registration-success')).toBeVisible();
  });

  test('should show error for already registered email', async ({ page }) => {
    await mockApi(page, '**/api/v1/users/register', {
      status: 409,
      body: {
        error: 'Email already registered',
        details: 'The email test.user@example.com is already in use.',
      },
    });
    await page.goto('/register');
    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.fill('input[name="password"]', 'ValidPass1!');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="phoneNumber"]', '+12345678901');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Email already registered')).toBeVisible();
    await expect(page.getByTestId('registration-error')).toBeVisible();
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'short');
    await page.fill('input[name="name"]', '');
    await page.fill('input[name="phoneNumber"]', '123');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/invalid email/i)).toBeVisible();
    await expect(page.getByText(/password must contain/i)).toBeVisible();
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/phone number is invalid/i)).toBeVisible();
    await expect(page.getByTestId('registration-error')).toBeVisible();
  });

  test('should show error for too many registration attempts', async ({ page }) => {
    await mockApi(page, '**/api/v1/users/register', {
      status: 429,
      body: {
        error: 'Too many registration attempts',
        details: 'Please try again later.',
      },
    });
    await page.goto('/register');
    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.fill('input[name="password"]', 'ValidPass1!');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="phoneNumber"]', '+12345678901');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Too many registration attempts')).toBeVisible();
    await expect(page.getByTestId('registration-error')).toBeVisible();
  });

  test('should handle edge case: missing required fields', async ({ page }) => {
    await page.goto('/register');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/phone number is required/i)).toBeVisible();
    await expect(page.getByTestId('registration-error')).toBeVisible();
  });

  test('should handle edge case: address omitted', async ({ page }) => {
    await mockApi(page, '**/api/v1/users/register', {
      status: 201,
      body: {
        message: 'Please check your email to verify your account',
        userId: 'user-456',
        emailVerified: false,
        status: 'Active',
        role: 'Customer',
      },
    });
    await page.goto('/register');
    await page.fill('input[name="email"]', 'no.address@example.com');
    await page.fill('input[name="password"]', 'ValidPass1!');
    await page.fill('input[name="name"]', 'No Address');
    await page.fill('input[name="phoneNumber"]', '+12345678901');
    // Do not fill address fields
    await page.click('button[type="submit"]');
    await expect(page.getByText('Please check your email to verify your account')).toBeVisible();
    await expect(page.getByTestId('registration-success')).toBeVisible();
  });

  test('should show error for invalid address fields', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.fill('input[name="password"]', 'ValidPass1!');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="phoneNumber"]', '+12345678901');
    await page.fill('input[name="address.line1"]', '');
    await page.fill('input[name="address.city"]', '');
    await page.fill('input[name="address.state"]', '');
    await page.fill('input[name="address.postalCode"]', '');
    await page.fill('input[name="address.country"]', '');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/address line1 is required/i)).toBeVisible();
    await expect(page.getByText(/city is required/i)).toBeVisible();
    await expect(page.getByText(/state is required/i)).toBeVisible();
    await expect(page.getByText(/postal code is required/i)).toBeVisible();
    await expect(page.getByText(/country is required/i)).toBeVisible();
    await expect(page.getByTestId('registration-error')).toBeVisible();
  });
});
// GH Copilot code - end
