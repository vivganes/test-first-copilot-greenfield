// GH Copilot code - starts
import { renderHook, act } from '@testing-library/react';
import usePasswordValidation from './usePasswordValidation';

describe('usePasswordValidation', () => {
  it('validates strong password', () => {
    const { result } = renderHook(() => usePasswordValidation());
    
    // Test initial state
    expect(result.current.isValid).toBe(true);
    expect(result.current.error).toBe('');
    
    // Test validation with strong password
    act(() => {
      const isValid = result.current.validatePassword('StrongPass123!');
      expect(isValid).toBe(true);
    });
    expect(result.current.isValid).toBe(true);
    expect(result.current.error).toBe('');
  });

  it('invalidates weak password', () => {
    const { result } = renderHook(() => usePasswordValidation());
    
    // Test validation with weak password
    act(() => {
      const isValid = result.current.validatePassword('123');
      expect(isValid).toBe(false);
    });
    expect(result.current.isValid).toBe(false);
    expect(result.current.error).toMatch(/password does not meet strength requirements/i);
  });
});
// GH Copilot code - end
