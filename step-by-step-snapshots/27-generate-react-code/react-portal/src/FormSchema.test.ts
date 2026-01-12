// GH Copilot code - starts
import { validateRegistrationForm } from './FormSchema';

describe('FormSchema', () => {
  it('validates correct data as valid', () => {
    const data = {
      name: 'Test User',
      email: 'user@example.com',
      password: 'StrongPass123!',
      phone: '+1234567890',
      address: '123 Main St',
    };
    const result = validateRegistrationForm(data);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('returns errors for invalid data', () => {
    const data = {
      name: '',
      email: 'invalid-email',
      password: '123',
      phone: '',
      address: '',
    };
    const result = validateRegistrationForm(data);
    expect(result.valid).toBe(false);
    expect(result.errors.email).toMatch(/invalid email/i);
    expect(result.errors.password).toMatch(/password does not meet strength requirements/i);
    expect(result.errors.phoneNumber).toMatch(/required/i);
    expect(result.errors.name).toMatch(/required/i);
    expect(result.errors.address).toMatch(/required/i);
  });
});
// GH Copilot code - end
