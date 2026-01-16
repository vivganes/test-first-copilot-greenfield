// GH Copilot code - starts
import React from 'react';
import FormErrorMessage from './FormErrorMessage';

interface RegistrationFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

const RegistrationField: React.FC<RegistrationFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="registration-field" style={{ marginBottom: '16px' }}>
      <label 
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '4px',
          fontWeight: '500',
          fontSize: '14px',
          color: '#333'
        }}
      >
        {label} {required && <span style={{ color: '#dc3545' }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '12px',
          border: `1px solid ${error ? '#dc3545' : '#ced4da'}`,
          borderRadius: '4px',
          fontSize: '16px',
          boxSizing: 'border-box',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
      />
      <FormErrorMessage message={error || ''} />
    </div>
  );
};

export default RegistrationField;
// GH Copilot code - end