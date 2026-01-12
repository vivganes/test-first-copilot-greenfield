// GH Copilot code - starts
import { registerUser as apiRegisterUser } from './apiClient';
import type { RegistrationFormData } from './FormSchema';
import type { RegistrationResponse } from './apiClient';

export const registerUser = async (data: RegistrationFormData): Promise<RegistrationResponse> => {
  return await apiRegisterUser(data);
};
// GH Copilot code - end