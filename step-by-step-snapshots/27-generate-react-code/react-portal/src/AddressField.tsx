// GH Copilot code - starts
import React from 'react';
import RegistrationField from './RegistrationField';

interface AddressFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const AddressField: React.FC<AddressFieldProps> = ({ value, onChange, error }) => {
  return (
    <RegistrationField
      label="Address"
      name="address"
      type="text"
      value={value}
      onChange={onChange}
      error={error}
      placeholder="123 Main St"
      required
    />
  );
};

export default AddressField;
// GH Copilot code - end