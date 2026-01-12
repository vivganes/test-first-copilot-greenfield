// GH Copilot code - starts
import { isValidEmail, isValidPassword, isValidPhoneNumber, isValidName } from './validationUtils';

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export const validateRegistrationForm = (data: RegistrationFormData): ValidationResult => {
  const errors: Record<string, string> = {};
  
  if (!data.name || !isValidName(data.name)) {
    errors.name = data.name ? 'Name must contain only letters and spaces' : 'Name is required';
  }
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(data.password)) {
    errors.password = 'Password does not meet strength requirements';
  }
  
  if (!data.phone) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!isValidPhoneNumber(data.phone)) {
    errors.phoneNumber = 'Invalid phone number format';
  }
  
  if (!data.address) {
    errors.address = 'Address is required';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
// GH Copilot code - end