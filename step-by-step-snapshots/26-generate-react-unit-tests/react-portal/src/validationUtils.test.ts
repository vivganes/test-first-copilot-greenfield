// GH Copilot code - starts
import { isValidEmail, isValidPassword } from './validationUtils';

describe('validationUtils', () => {
  it('validates email format', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  it('validates password strength', () => {
    expect(isValidPassword('StrongPass123!')).toBe(true);
    expect(isValidPassword('123')).toBe(false);
  });
});
// GH Copilot code - end
