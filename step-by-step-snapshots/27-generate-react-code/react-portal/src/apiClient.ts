// GH Copilot code - starts
import { REGISTRATION_API } from './ApiEndpoints';
import type { RegistrationFormData } from './FormSchema';

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  userId?: string;
  error?: string;
  details?: Record<string, string>;
}

export const registerUser = async (data: RegistrationFormData): Promise<RegistrationResponse> => {
  try {
    const response = await fetch(REGISTRATION_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phone,
        address: {
          type: 'Shipping',
          line1: data.address,
          city: '',
          state: '',
          postalCode: '',
          country: '',
          isDefault: true
        }
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: result.message,
        userId: result.userId
      };
    } else {
      return {
        success: false,
        error: result.error || 'Registration failed',
        details: result.details
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error occurred'
    };
  }
};
// GH Copilot code - end