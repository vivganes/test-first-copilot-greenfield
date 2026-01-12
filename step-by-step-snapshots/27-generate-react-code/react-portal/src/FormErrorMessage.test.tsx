// GH Copilot code - starts
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormErrorMessage from './FormErrorMessage';

describe('FormErrorMessage', () => {
  it('renders error message', () => {
    render(<FormErrorMessage message="Invalid email" />);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
// GH Copilot code - end
