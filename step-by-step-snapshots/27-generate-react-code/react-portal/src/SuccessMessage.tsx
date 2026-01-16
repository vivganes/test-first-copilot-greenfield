// GH Copilot code - starts
import React from 'react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="success-message" role="alert" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#155724',
      fontSize: '24px',
      fontWeight: 'bold',
      padding: '32px 24px',
      backgroundColor: '#d1ecf1',
      border: '2px solid #17a2b8',
      borderRadius: '12px',
      marginBottom: '24px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      animation: 'fadeIn 0.5s ease-in-out'
    }}>
      <div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '16px', flexShrink: 0 }}
        >
          <path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            fill="#155724"
          />
        </svg>
        <span>{message}</span>
        <p style={{ fontSize: '18px', marginTop: '12px', color: '#0c5460' }}>
          Check your email for the next steps.
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SuccessMessage;
// GH Copilot code - end