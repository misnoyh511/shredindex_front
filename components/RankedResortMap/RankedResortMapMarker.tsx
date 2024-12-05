import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { currentOrderByState } from '../../atoms/filterState';
import { TypeIcon } from '@/Icons/TypeIcon';
import { SvgIcon } from '@/Icons/SvgIcon';
import TotalScore from '../../icons/total-score.svg';
import { Resort } from '../../types/resortTypes';
import isNumber from '../../utils/helperFunctions';
import getUnit from '../../hooks/getUnit';

interface ResortMarkerProps {
  resort: Resort;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const getBackgroundColor = (percentage: number | 'n/a', isNumeric: boolean = false): string => {
  if (percentage === 'n/a') return 'var(--cui-gray-500)';

  if (isNumeric) {
    // For numeric values, use fourth root scaling for even more compression
    const scaledPercentage = Math.pow(percentage, 0.25) * 20; // Fourth root scale with higher multiplier

    if (scaledPercentage >= 80) return 'var(--cui-success)';
    if (scaledPercentage >= 60) return 'var(--cui-info)';
    if (scaledPercentage >= 40) return 'var(--cui-warning)';
    return 'var(--cui-danger)';
  } else {
    // Original scaling for non-numeric values
    if (percentage >= 80) return 'var(--cui-success)';
    if (percentage >= 60) return 'var(--cui-info)';
    if (percentage >= 40) return 'var(--cui-warning)';
    return 'var(--cui-danger)';
  }
};

const formatValue = (value: number | string | undefined, maxValue?: number, unitString?: string) => {
  if (value === undefined || value === 'n/a' || !isNumber(value)) {
    return {
      displayValue: 'n/a',
      backgroundColor: getBackgroundColor('n/a'),
      unit: '',
    };
  }

  const numberValue = Number(value);
  const [int, decimal] = numberValue.toFixed(1).toString().split('.');
  const unit = getUnit({ unit: unitString });

  // Only apply compressed scaling for numerics (when maxValue is present)
  let percentage;
  if (maxValue) {
    // For numerics, calculate basic percentage then apply eighth root scaling
    const rawPercentage = (numberValue / maxValue) * 100;
    percentage = Math.pow(rawPercentage, 0.125) * 40; // Eighth root compression for numerics
  } else {
    // For ratings or total score, use the raw value directly
    percentage = numberValue;
  }

  return {
    displayValue: unit?.name === 'total' ? int : `${int}.${decimal}`,
    backgroundColor: getBackgroundColor(percentage),
    unit: unit || '',
  };
};

const ResortMarker = memo(({ resort, isSelected, onClick }: ResortMarkerProps) => {
  const currentFilter = useRecoilValue(currentOrderByState);
  const orderByType = currentFilter?.type_name || 'total_score';

  // Get the value based on the current filter
  let value, maxValue, unit;

  if (orderByType === 'total_score') {
    value = resort.total_score?.value;
  } else {
    // Check ratingScores first
    const ratingScore = resort.ratingScores?.find(s => s.name === orderByType);
    if (ratingScore) {
      value = ratingScore.value;
    } else {
      // Check numerics if not found in ratingScores
      const numeric = resort.numerics?.find(n => n.name === orderByType);
      if (numeric) {
        value = numeric.value;
        maxValue = numeric.type?.max_value;
        unit = numeric.type?.unit;
      }
    }
  }

  // Default to 'n/a' if no value found
  if (value === undefined) value = 'n/a';

  const { displayValue, backgroundColor, unit: displayUnit } = formatValue(value, maxValue, unit);

  // Calculate z-index based on value
  let zIndex = 1;
  if (value !== 'n/a' && typeof value === 'number') {
    // Scale the value to a range between 1 and 1000 for z-index
    if (maxValue) {
      // For numerics, scale based on maxValue
      zIndex = Math.floor((value / maxValue) * 1000);
    } else {
      // For ratings and total score (0-100 scale)
      zIndex = Math.floor(value * 10);
    }
  }

  // If selected, add 1000 to ensure it's always on top
  if (isSelected) {
    zIndex += 1000;
  }

  return (
    <div
      onClick={onClick}
      className="position-relative"
      style={{
        transform: 'translate(-50%, -50%)',
        zIndex,
      }}
    >
      <div
        className="d-inline-flex align-items-center rounded-pill shadow-sm"
        style={{
          padding: '0.375rem 0.75rem',
          backgroundColor,
          border: isSelected ? '2px solid var(--cui-info)' : '1px solid var(--cui-border-color-translucent)',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {/* Score */}
        <span
          className={`fw-semibold pe-2 ${value === 'n/a' ? 'text-white' : 'text-dark'} text-nowrap`}
          style={{ fontSize: '0.9rem', minWidth: '2.5rem' }}
        >
          {displayValue}
          {displayUnit && (
            <span className={`ps-1 ${value === 'n/a' ? 'text-white-50' : 'text-dark'}`} style={{ fontSize: '0.8rem' }}>
              {displayUnit}
            </span>
          )}
        </span>

        {/* Icon */}
        <span className={`pe-2 ${value === 'n/a' ? 'text-white' : 'text-dark'}`}>
          {orderByType === 'total_score' ? (
            <SvgIcon
              svgContent={TotalScore}
              size="1.2rem"
            />
          ) : (
            <TypeIcon
              typeName={orderByType}
              size="1.2rem"
            />
          )}
        </span>

        {/* Title */}
        <span
          className={`text-truncate ${value === 'n/a' ? 'text-white' : 'text-dark'} user-select-none`}
          style={{ maxWidth: '80px', fontSize: '0.9rem' }}
        >
          {resort.title}
        </span>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.resort.id === nextProps.resort.id &&
    prevProps.resort.total_score?.value === nextProps.resort.total_score?.value &&
    prevProps.resort.title === nextProps.resort.title &&
    JSON.stringify(prevProps.resort.ratingScores) === JSON.stringify(nextProps.resort.ratingScores) &&
    JSON.stringify(prevProps.resort.numerics) === JSON.stringify(nextProps.resort.numerics)
  );
});

ResortMarker.displayName = 'ResortMarker';

export default ResortMarker;
