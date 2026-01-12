// GH Copilot code - starts
import { registerUser } from './RegistrationService';

describe('RegistrationService', () => {
  it('calls apiClient with correct data', async () => {
    const mockApiClient = jest.fn().mockResolvedValue({ success: true });
    jest.mock('./apiClient', () => ({ registerUser: mockApiClient }));
    const payload = {
      email: 'user@example.com',
      password: 'StrongPass123!',
      phoneNumber: '+1234567890',
      address: '123 Main St',
    };
    const result = await registerUser(payload);
    expect(mockApiClient).toHaveBeenCalledWith(payload);
    expect(result.success).toBe(true);
  });
});
// GH Copilot code - end
