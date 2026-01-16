// GH Copilot code - starts
import React from 'react';
import RegistrationField from './RegistrationField';

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, error }) => {
  return (
    <RegistrationField
      label="Password"
      name="password"
      type="password"
      value={value}
      onChange={onChange}
      error={error}
      placeholder="Enter a strong password"
      required
    />
  );
};

export default PasswordField;
// GH Copilot code - end