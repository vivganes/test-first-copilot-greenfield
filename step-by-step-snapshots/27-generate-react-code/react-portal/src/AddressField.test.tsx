// GH Copilot code - starts
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddressField from './AddressField';

describe('AddressField', () => {
  it('renders address input and label', () => {
    render(<AddressField value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
  });

  it('calls onChange when address changes', () => {
    const handleChange = jest.fn();
    render(<AddressField value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
// GH Copilot code - end
