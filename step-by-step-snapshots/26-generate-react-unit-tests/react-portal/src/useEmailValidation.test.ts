// GH Copilot code - starts
import { renderHook } from '@testing-library/react-hooks';
import useEmailValidation from './useEmailValidation';

describe('useEmailValidation', () => {
  it('validates correct email', () => {
    const { result } = renderHook(() => useEmailValidation('user@example.com'));
    expect(result.current.isValid).toBe(true);
    expect(result.current.error).toBe('');
  });

  it('invalidates incorrect email', () => {
    const { result } = renderHook(() => useEmailValidation('invalid-email'));
    expect(result.current.isValid).toBe(false);
    expect(result.current.error).toMatch(/invalid email/i);
  });
});
// GH Copilot code - end
