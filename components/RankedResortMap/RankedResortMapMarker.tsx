import React from 'react';

const ResortMarker = ({ resort, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        d-inline-flex
        align-items-center
        rounded-pill
        shadow
        p-2
        fw-bolder
        text-dark
        bg-primary
        border-2
        ${isSelected ? 'border-info' : 'border-light'}
      `}
      style={{
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        maxWidth: '150px',
      }}
    >
      <span
        className="user-select-none text-truncate"
        style={{
          maxWidth: '120px',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {resort.total_score?.value
          ? `${resort.total_score.value} ${resort.title}`
          : resort.title}
      </span>
    </div>
  );
};

export default ResortMarker;
