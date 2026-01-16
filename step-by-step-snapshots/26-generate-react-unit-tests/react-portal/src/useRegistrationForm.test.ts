// GH Copilot code - starts
import { renderHook, act } from '@testing-library/react-hooks';
import useRegistrationForm from './useRegistrationForm';

describe('useRegistrationForm', () => {
  it('initializes with empty values', () => {
    const { result } = renderHook(() => useRegistrationForm());
    expect(result.current.values).toEqual({
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
    });
  });

  it('updates field value', () => {
    const { result } = renderHook(() => useRegistrationForm());
    act(() => {
      result.current.handleChange('email', 'user@example.com');
    });
    expect(result.current.values.email).toBe('user@example.com');
  });

  it('resets form', () => {
    const { result } = renderHook(() => useRegistrationForm());
    act(() => {
      result.current.handleChange('email', 'user@example.com');
      result.current.resetForm();
    });
    expect(result.current.values).toEqual({
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
    });
  });
});
// GH Copilot code - end
