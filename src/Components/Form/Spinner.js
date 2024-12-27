import React from 'react';
import styled from 'styled-components';

const SpinStyle = styled.div`
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.spinner {
  border: 8px solid #0b479d;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;

const Spinner = () => {
  return (
    <SpinStyle>

    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
    </SpinStyle>
  );
};

export default Spinner;
