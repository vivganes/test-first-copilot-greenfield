// GH Copilot code - starts
// Integration test for User Registration UI
// This file is marked as an integration test

import { test, expect } from '@playwright/test';

// Mock API responses as per the OpenAPI spec
const mockApi = {
  success: {
    status: 201,
    body: { userId: '12345', message: 'Registration successful' }
  },
  validationError: {
    status: 400,
    body: { error: 'Invalid input', details: { email: 'Invalid email format' } }
  },
  duplicateUser: {
    status: 409,
    body: { error: 'User already exists' }
  },
  serverError: {
    status: 500,
    body: { error: 'Internal server error' }
  }
};

// Helper to mock fetch for registration endpoint
async function mockRegistrationApi(page, response) {
  await page.route('**/api/register', route => {
    route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body)
    });
  });
}

test.describe('User Registration Integration (UI + API)', () => {
  test('should register a new user with valid data (positive case)', async ({ page }) => {
    await mockRegistrationApi(page, mockApi.success);
    await page.goto('/register');
  // Fill all required fields as per FormSchema
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'StrongPassword123!');
  await page.fill('input[name="phone"]', '+1234567890');
  await page.fill('input[name="address"]', '123 Main St');
  await page.click('button[type="submit"]');
    // Expect success message
    await expect(page.getByText('Registration successful')).toBeVisible();
    // Expect redirect or UI update as per sequence diagram
    // (e.g., redirect to login or dashboard)
  });

  test('should show validation error for invalid email (negative case)', async ({ page }) => {
    await mockRegistrationApi(page, mockApi.validationError);
    await page.goto('/register');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'invalid-email');
  await page.fill('input[name="password"]', 'StrongPassword123!');
  await page.click('button[type="submit"]');
    // Expect error message for email field
    await expect(page.getByText('Invalid email format')).toBeVisible();
  });

  test('should show error for duplicate user registration (negative case)', async ({ page }) => {
    await mockRegistrationApi(page, mockApi.duplicateUser);
    await page.goto('/register');
  await page.fill('input[name="name"]', 'Existing User');
  await page.fill('input[name="email"]', 'existinguser@example.com');
  await page.fill('input[name="password"]', 'StrongPassword123!');
  await page.click('button[type="submit"]');
    // Expect duplicate user error message
    await expect(page.getByText('User already exists')).toBeVisible();
  });

  test('should handle server error gracefully (corner case)', async ({ page }) => {
    await mockRegistrationApi(page, mockApi.serverError);
    await page.goto('/register');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'StrongPassword123!');
  await page.click('button[type="submit"]');
    // Expect generic error message
    await expect(page.getByText('Internal server error')).toBeVisible();
  });

  test('should show required field errors (corner case)', async ({ page }) => {
    await page.goto('/register');
    await page.click('button[type="submit"]');
  // Expect error messages for all required fields
  await expect(page.getByText('Name is required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
  // Add checks for other required fields as per FormSchema
  });

  test('should enforce password strength requirements (corner case)', async ({ page }) => {
    await page.goto('/register');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'weak');
  await page.click('button[type="submit"]');
    // Expect password strength error
    await expect(page.getByText('Password does not meet strength requirements')).toBeVisible();
  });
});
// GH Copilot code - end
