// Spinner.jsx
import React from 'react';
import '../styles/spinner.css'; // Import CSS for spinner styles

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
