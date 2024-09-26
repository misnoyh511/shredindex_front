import React from 'react';
import { CFormRange } from '@coreui/react';

interface RangeSliderProps {
  id: string;
  min: number;
  max: number;
  steps?: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  id,
  min,
  max,
  steps = 1,
  value,
  onChange,
  label = '',
}) => (
  <>
    <CFormRange
      id={id}
      min={min}
      max={max}
      step={steps}
      value={value}
      onChange={onChange}
      label={label}
    />
    {value}
  </>
);

export default RangeSlider;
