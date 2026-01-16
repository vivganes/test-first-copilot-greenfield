// GH Copilot code - starts
import React from 'react';

interface SubmitButtonProps {
  label: string;
  disabled: boolean;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, disabled, onClick }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: disabled ? '#6c757d' : '#007bff',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: '100%',
        transition: 'background-color 0.2s'
      }}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
// GH Copilot code - end