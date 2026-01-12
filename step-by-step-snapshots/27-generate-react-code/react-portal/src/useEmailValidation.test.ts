// GH Copilot code - starts
import { renderHook, act } from '@testing-library/react';
import useEmailValidation from './useEmailValidation';

describe('useEmailValidation', () => {
  it('validates correct email', () => {
    const { result } = renderHook(() => useEmailValidation());
    
    // Test initial state
    expect(result.current.isValid).toBe(true);
    expect(result.current.error).toBe('');
    
    // Test validation with correct email
    act(() => {
      const isValid = result.current.validateEmail('user@example.com');
      expect(isValid).toBe(true);
    });
    expect(result.current.isValid).toBe(true);
    expect(result.current.error).toBe('');
  });

  it('invalidates incorrect email', () => {
    const { result } = renderHook(() => useEmailValidation());
    
    // Test validation with invalid email
    act(() => {
      const isValid = result.current.validateEmail('invalid-email');
      expect(isValid).toBe(false);
    });
    expect(result.current.isValid).toBe(false);
    expect(result.current.error).toMatch(/invalid email/i);
  });
});
// GH Copilot code - end
