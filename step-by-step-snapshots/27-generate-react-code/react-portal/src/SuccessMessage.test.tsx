// GH Copilot code - starts
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuccessMessage from './SuccessMessage';

describe('SuccessMessage', () => {
  it('renders success message', () => {
    render(<SuccessMessage message="Registration successful" />);
    expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
  });
});
// GH Copilot code - end
