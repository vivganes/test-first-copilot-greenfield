// GH Copilot code - starts
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PhoneNumberField from './PhoneNumberField';

describe('PhoneNumberField', () => {
  it('renders phone number input and label', () => {
    render(<PhoneNumberField value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it('calls onChange when phone number changes', () => {
    const handleChange = jest.fn();
    render(<PhoneNumberField value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '+1234567890' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
// GH Copilot code - end
