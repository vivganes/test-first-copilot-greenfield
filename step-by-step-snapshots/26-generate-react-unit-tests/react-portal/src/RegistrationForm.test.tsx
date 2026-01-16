// GH Copilot code - starts
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';

// Mock dependencies
jest.mock('./RegistrationService');
jest.mock('./FormSchema');

// Main positive registration flow

describe('RegistrationForm', () => {
  it('renders all required fields for user registration', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/password must be/i)).toBeInTheDocument();
  });

  it('submits valid data and shows success message', async () => {
    const mockRegister = require('./RegistrationService').registerUser;
    mockRegister.mockResolvedValue({ success: true });
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'StrongPass123!' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'StrongPass123!',
        phoneNumber: '+1234567890',
        address: '123 Main St',
      });
    });
    expect(await screen.findByText(/registration successful/i)).toBeInTheDocument();
  });

  it('shows error message on registration failure', async () => {
    const mockRegister = require('./RegistrationService').registerUser;
    mockRegister.mockResolvedValue({ success: false, error: 'Email already exists' });
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'StrongPass123!' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(/email already exists/i)).toBeInTheDocument();
  });
});
// GH Copilot code - end
