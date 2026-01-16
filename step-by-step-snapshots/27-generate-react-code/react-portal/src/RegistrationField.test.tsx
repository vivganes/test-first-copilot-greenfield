// GH Copilot code - starts
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationField from './RegistrationField';

describe('RegistrationField', () => {
  it('renders label and input', () => {
    render(<RegistrationField label="Email" name="email" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<RegistrationField label="Email" name="email" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
// GH Copilot code - end
