import React from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
  position: 'relative',
  borderRadius: '0.5rem',
  overflow: 'hidden',
};

const ResortMapSkeleton = () => (
  <div style={containerStyle}>
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '3px solid #1d2e39',
        borderTop: '3px solid #3498db',
        animation: 'spin 1s linear infinite',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '100px',
        height: '20px',
        borderRadius: '4px',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '10px',
        width: '40px',
        height: '80px',
        borderRadius: '4px',
      }}
    />
  </div>
);

export default ResortMapSkeleton;
