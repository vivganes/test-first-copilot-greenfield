// GH Copilot code - starts
import React from 'react';

interface FormErrorMessageProps {
  message: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="form-error-message" role="alert" style={{
      color: '#dc3545',
      fontSize: '14px',
      marginTop: '4px',
      display: 'block'
    }}>
      {message}
    </div>
  );
};

export default FormErrorMessage;
// GH Copilot code - end