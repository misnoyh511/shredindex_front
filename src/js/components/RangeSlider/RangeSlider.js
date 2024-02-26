import {
  CFormRange,
} from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';

const RangeSlider = ({
  id, min, max, steps, value, onChange, label, tooltip,
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

RangeSlider.propTypes = {
  id: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  steps: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
};

RangeSlider.defaultProps = {
  steps: 1,
  label: '',
  tooltip: '',
};

export default RangeSlider;
