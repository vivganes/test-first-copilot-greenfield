// GH Copilot code - starts
import { useState, useCallback } from 'react';
import { isValidPassword } from './validationUtils';

export interface PasswordValidationState {
  isValid: boolean;
  error: string;
}

export const usePasswordValidation = () => {
  const [validationState, setValidationState] = useState<PasswordValidationState>({
    isValid: true,
    error: ''
  });

  const validatePassword = useCallback((password: string) => {
    if (!password) {
      setValidationState({
        isValid: false,
        error: 'Password is required'
      });
      return false;
    }

    if (!isValidPassword(password)) {
      setValidationState({
        isValid: false,
        error: 'Password does not meet strength requirements'
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
    validatePassword
  };
};

export default usePasswordValidation;
// GH Copilot code - end