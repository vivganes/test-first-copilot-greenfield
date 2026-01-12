// GH Copilot code - starts
import { useState, useCallback } from 'react';
import type { RegistrationFormData } from './FormSchema';
import { validateRegistrationForm } from './FormSchema';

export interface RegistrationFormState extends RegistrationFormData {
  errors: Record<string, string>;
  isSubmitting: boolean;
  submissionError: string;
  isValid: boolean;
}

export const useRegistrationForm = () => {
  const [formState, setFormState] = useState<RegistrationFormState>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    errors: {},
    isSubmitting: false,
    submissionError: '',
    isValid: false
  });

  const updateField = useCallback((field: keyof RegistrationFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: ''
      },
      submissionError: ''
    }));
  }, []);

  const validateForm = useCallback((data?: RegistrationFormData) => {
    const dataToValidate = data || formState;
    const validation = validateRegistrationForm(dataToValidate);
    
    setFormState(prev => ({
      ...prev,
      errors: validation.errors,
      isValid: validation.valid
    }));

    return validation.valid;
  }, [formState]);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState(prev => ({
      ...prev,
      isSubmitting
    }));
  }, []);

  const setSubmissionError = useCallback((error: string) => {
    setFormState(prev => ({
      ...prev,
      submissionError: error,
      isSubmitting: false
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      errors: {},
      isSubmitting: false,
      submissionError: '',
      isValid: false
    });
  }, []);

  return {
    formState,
    updateField,
    validateForm,
    setSubmitting,
    setSubmissionError,
    resetForm
  };
};

export default useRegistrationForm;
// GH Copilot code - end