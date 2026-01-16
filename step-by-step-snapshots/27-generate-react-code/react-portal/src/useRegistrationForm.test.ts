// GH Copilot code - starts
import { renderHook, act } from '@testing-library/react';
import useRegistrationForm from './useRegistrationForm';

describe('useRegistrationForm', () => {
  it('initializes with empty values', () => {
    const { result } = renderHook(() => useRegistrationForm());
    expect(result.current.formState).toEqual({
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
  });

  it('updates field value', () => {
    const { result } = renderHook(() => useRegistrationForm());
    act(() => {
      result.current.updateField('email', 'user@example.com');
    });
    expect(result.current.formState.email).toBe('user@example.com');
  });

  it('resets form', () => {
    const { result } = renderHook(() => useRegistrationForm());
    act(() => {
      result.current.updateField('email', 'user@example.com');
      result.current.resetForm();
    });
    expect(result.current.formState).toEqual({
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
  });
});
// GH Copilot code - end
