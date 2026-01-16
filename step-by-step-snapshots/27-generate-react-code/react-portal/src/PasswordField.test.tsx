// GH Copilot code - starts
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordField from './PasswordField';

describe('PasswordField', () => {
  it('renders password input and label', () => {
    render(<PasswordField value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('calls onChange when password changes', () => {
    const handleChange = jest.fn();
    render(<PasswordField value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'StrongPass123!' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
// GH Copilot code - end
