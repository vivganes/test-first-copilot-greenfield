// GH Copilot code - starts
import { renderHook } from '@testing-library/react-hooks';
import usePasswordValidation from './usePasswordValidation';

describe('usePasswordValidation', () => {
  it('validates strong password', () => {
    const { result } = renderHook(() => usePasswordValidation('StrongPass123!'));
    expect(result.current.isValid).toBe(true);
    expect(result.current.error).toBe('');
  });

  it('invalidates weak password', () => {
    const { result } = renderHook(() => usePasswordValidation('123'));
    expect(result.current.isValid).toBe(false);
    expect(result.current.error).toMatch(/password must be/i);
  });
});
// GH Copilot code - end
