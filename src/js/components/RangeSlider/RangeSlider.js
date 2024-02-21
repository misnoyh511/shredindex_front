import {
  CFormRange,
} from '@coreui/react';
import React from 'react';

const RangeSlider = ({
  id, min, max, steps, value, onChange, label, tooltip, toggleOn,
}) => (
  <>
    <CFormRange
      id={id}
      min={min}
      max={max}
      steps={steps}
      value={value}
      onChange={onChange}
      label={label}
      tooltip={tooltip}
    />
    {value}
  </>
);
export default RangeSlider;
