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
      email: 'user@example.com',
      password: 'StrongPass123!',
      phoneNumber: '+1234567890',
      address: '123 Main St',
    };
    const result = await registerUser(payload);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/register'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(payload),
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
      email: 'user@example.com',
      password: 'StrongPass123!',
      phoneNumber: '+1234567890',
      address: '123 Main St',
    };
    const result = await registerUser(payload);
    expect(result.error).toBe('Email already exists');
  });
});
// GH Copilot code - end
