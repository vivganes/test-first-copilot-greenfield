// GH Copilot code - starts
import { useState, useCallback } from 'react';
import { isValidEmail } from './validationUtils';

export interface EmailValidationState {
  isValid: boolean;
  error: string;
}

export const useEmailValidation = () => {
  const [validationState, setValidationState] = useState<EmailValidationState>({
    isValid: true,
    error: ''
  });

  const validateEmail = useCallback((email: string) => {
    if (!email) {
      setValidationState({
        isValid: false,
        error: 'Email is required'
      });
      return false;
    }

    if (!isValidEmail(email)) {
      setValidationState({
        isValid: false,
        error: 'Invalid email format'
      });
      return false;
    }

    setValidationState({
      isValid: true,
      error: ''
    });
    return true;
  }, []);

  return {
    ...validationState,
    validateEmail
  };
};

export default useEmailValidation;
// GH Copilot code - end