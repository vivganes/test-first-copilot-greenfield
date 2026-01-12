// GH Copilot code - starts
import { registerUser } from './RegistrationService';

// Mock the apiClient module
jest.mock('./apiClient', () => ({
  registerUser: jest.fn()
}));

// Import the mocked module
import * as apiClient from './apiClient';
const mockApiClientRegisterUser = apiClient.registerUser as jest.MockedFunction<typeof apiClient.registerUser>;

describe('RegistrationService', () => {
  beforeEach(() => {
    mockApiClientRegisterUser.mockClear();
  });

  it('calls apiClient with correct data', async () => {
    mockApiClientRegisterUser.mockResolvedValue({ success: true });
    const payload = {
      name: 'Test User',
      email: 'user@example.com',
      password: 'StrongPass123!',
      phone: '+1234567890',
      address: '123 Main St',
    };
    const result = await registerUser(payload);
    expect(mockApiClientRegisterUser).toHaveBeenCalledWith(payload);
    expect(result.success).toBe(true);
  });
});
// GH Copilot code - end
