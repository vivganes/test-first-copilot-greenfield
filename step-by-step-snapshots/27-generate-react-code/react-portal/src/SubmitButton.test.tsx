// GH Copilot code - starts
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  it('renders button with label', () => {
    render(<SubmitButton label="Register" disabled={false} />);
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<SubmitButton label="Register" disabled={true} />);
    expect(screen.getByRole('button', { name: /register/i })).toBeDisabled();
  });
});
// GH Copilot code - end
