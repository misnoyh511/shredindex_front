import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilMap } from '@coreui/icons';

const ResortMapLoadingState = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, #1D2E39 0%, #283C49 50%, #1D2E39 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CIcon
          icon={cilMap}
          size="5xl"
          style={{
            color: '#1d2e39',
            animation: 'pulse 2s infinite',
          }}
        />
      </div>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ResortMapLoadingState;
