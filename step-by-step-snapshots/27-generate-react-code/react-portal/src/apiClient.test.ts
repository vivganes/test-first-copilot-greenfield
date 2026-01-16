// GH Copilot code - starts
import { registerUser } from './apiClient';

describe('apiClient', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('calls registration API with correct payload', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    const payload = {
      name: 'Test User',
      email: 'user@example.com',
      password: 'StrongPass123!',
      phone: '+1234567890',
      address: '123 Main St',
    };
    const result = await registerUser(payload);
    
    // Check that fetch was called with the expected transformed payload
    const expectedPayload = {
      name: 'Test User',
      email: 'user@example.com',
      password: 'StrongPass123!',
      phoneNumber: '+1234567890',
      address: {
        type: 'Shipping',
        line1: '123 Main St',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: true
      }
    };
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/users/register'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expectedPayload),
      })
    );
    expect(result.success).toBe(true);
  });

  it('handles API error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Email already exists' }),
    });
    const payload = {
      name: 'Test User',
      email: 'user@example.com',
      password: 'StrongPass123!',
      phone: '+1234567890',
      address: '123 Main St',
    };
    const result = await registerUser(payload);
    expect(result.error).toBe('Email already exists');
  });
});
// GH Copilot code - end
