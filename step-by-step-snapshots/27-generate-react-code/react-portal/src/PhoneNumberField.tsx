// GH Copilot code - starts
import React from 'react';
import RegistrationField from './RegistrationField';

interface PhoneNumberFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({ value, onChange, error }) => {
  return (
    <RegistrationField
      label="Phone Number"
      name="phone"
      type="tel"
      value={value}
      onChange={onChange}
      error={error}
      placeholder="+1234567890"
      required
    />
  );
};

export default PhoneNumberField;
// GH Copilot code - end