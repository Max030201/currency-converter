import React from 'react';

const DebugInfo = () => {
  return (
    <div style={{ 
      padding: '20px', 
      background: '#f0f0f0', 
      margin: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    }}>
      <h4>🛠️ Debug Information:</h4>
      <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
      <p><strong>Base URL:</strong> {window.location.origin}</p>
      <p><strong>Pathname:</strong> {window.location.pathname}</p>
      <p><strong>Full URL:</strong> {window.location.href}</p>
      <p><strong>Router basename:</strong> {process.env.NODE_ENV === 'production' ? '/currency-converter' : ''}</p>
    </div>
  );
};

export default DebugInfo;