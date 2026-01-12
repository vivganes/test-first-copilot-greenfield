// GH Copilot code - starts
import React, { useState } from 'react';
import RegistrationField from './RegistrationField';
import PasswordField from './PasswordField';
import PhoneNumberField from './PhoneNumberField';
import AddressField from './AddressField';
import SubmitButton from './SubmitButton';
import FormErrorMessage from './FormErrorMessage';
import SuccessMessage from './SuccessMessage';
import useRegistrationForm from './useRegistrationForm';
import { registerUser } from './RegistrationService';

const RegistrationForm: React.FC = () => {
  const {
    formState,
    updateField,
    validateForm,
    setSubmitting,
    setSubmissionError,
    resetForm
  } = useRegistrationForm();

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the current form values from the form elements
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    const currentValues = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '', 
      password: (formData.get('password') as string) || '',
      phone: (formData.get('phone') as string) || '',
      address: (formData.get('address') as string) || ''
    };
    
    // Validate with current form values
    const isValid = validateForm(currentValues);
    
    if (!isValid) {
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');

    try {
      const result = await registerUser(currentValues);

      if (result.success) {
        setSuccessMessage('Registration successful');
        resetForm();
      } else {
        setSubmissionError(result.error || 'Registration failed');
      }
    } catch (error) {
      setSubmissionError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      padding: '24px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '24px',
        color: '#333',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        Register
      </h2>

      <SuccessMessage message={successMessage} />
      
      <form onSubmit={handleSubmit} noValidate>
        <RegistrationField
          label="Name"
          name="name"
          value={formState.name}
          onChange={(value) => updateField('name', value)}
          error={formState.errors.name}
          placeholder="Enter your full name"
          required
        />

        <RegistrationField
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={(value) => updateField('email', value)}
          error={formState.errors.email}
          placeholder="Enter your email"
          required
        />

        <PasswordField
          value={formState.password}
          onChange={(value) => updateField('password', value)}
          error={formState.errors.password}
        />

        <PhoneNumberField
          value={formState.phone}
          onChange={(value) => updateField('phone', value)}
          error={formState.errors.phoneNumber}
        />

        <AddressField
          value={formState.address}
          onChange={(value) => updateField('address', value)}
          error={formState.errors.address}
        />

        <FormErrorMessage message={formState.submissionError} />

        <SubmitButton
          label={formState.isSubmitting ? 'Registering...' : 'Register'}
          disabled={formState.isSubmitting}
        />
      </form>
    </div>
  );
};

export default RegistrationForm;
// GH Copilot code - end