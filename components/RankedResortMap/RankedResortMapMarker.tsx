import React, { memo } from 'react';
import { Resort } from '../../types/resortTypes';

interface ResortMarkerProps {
  resort: Resort;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ResortMarker: React.FC<ResortMarkerProps> = memo(({ resort, isSelected, onClick }) => {
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
        cursor: 'pointer',
        maxWidth: '150px',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
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
});

ResortMarker.displayName = 'ResortMarker';

export default ResortMarker;
