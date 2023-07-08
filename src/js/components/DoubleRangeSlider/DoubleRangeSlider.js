import React, { useState } from 'react';
import {
  CFormRange, CFormInput, CFormLabel,
} from '@coreui/react';
import PropTypes from 'prop-types';

const DoubleRangeSlider = ({
  sliderMin, sliderMax, initialLowerVal, initialUpperVal, sliderHandleGapPercentage, className,
}) => {
  const [lowerValue, setLowerValue] = useState(initialLowerVal);
  const [upperValue, setUpperValue] = useState(initialUpperVal);
  const [lowerFieldValue, setLowerFieldValue] = useState(initialLowerVal);
  const [upperFieldValue, setUpperFieldValue] = useState(initialUpperVal);
  const sliderMedian = ((sliderMin + sliderMax) / 2).toFixed(0);
  const sliderHandleGap = parseInt(((sliderMax - sliderMin) * (sliderHandleGapPercentage / 100)
  ).toFixed(0), 10);

  const widthSpanPercent = 100 / (sliderMax - sliderMin);
  const leftPosition = (lowerValue - sliderMin) * widthSpanPercent;
  const rightPosition = (upperValue - sliderMin) * widthSpanPercent;
  const rangeWidth = (rightPosition + sliderMin) - (leftPosition + sliderMin);

  function setLowerSlider(targetUpperValue) {
    if ((lowerValue > targetUpperValue - sliderHandleGap)
      || (targetUpperValue < lowerValue + sliderHandleGap)) {
      if (targetUpperValue >= sliderMax) {
        setLowerValue(parseInt(sliderMax, 10) - sliderHandleGap);
        setLowerFieldValue(parseInt(sliderMax, 10) - sliderHandleGap);
      }
      setLowerValue(Math.max(targetUpperValue - sliderHandleGap, sliderMin));
      setLowerFieldValue(Math.max(targetUpperValue - sliderHandleGap, sliderMin));
      if (targetUpperValue <= sliderMin + sliderHandleGap) {
        setUpperValue(sliderMin + sliderHandleGap);
        setUpperFieldValue(sliderMin + sliderHandleGap);
      }
    }
  }

  function setUpperSlider(targetLowerValue) {
    if ((targetLowerValue > upperValue - sliderHandleGap)
      || (upperValue < targetLowerValue + sliderHandleGap)) {
      if (targetLowerValue < sliderMax - sliderHandleGap) {
        setUpperValue(targetLowerValue + sliderHandleGap);
        setUpperFieldValue(targetLowerValue + sliderHandleGap);
      }
      setUpperValue(Math.min(targetLowerValue + sliderHandleGap, sliderMax));
      setUpperFieldValue(Math.min(targetLowerValue + sliderHandleGap, sliderMax));
      if (targetLowerValue >= sliderMax - sliderHandleGap) {
        setLowerValue(sliderMax - sliderHandleGap);
        setLowerFieldValue(sliderMax - sliderHandleGap);
      }
    }
  }

  function limitInput(target) {
    if (target > sliderMax) {
      return parseInt(sliderMax, 10);
    } if (target < sliderMin) {
      return parseInt(sliderMin, 10);
    }
    return parseInt(target, 10);
  }

  function handleLowerRangeSliderChange(target) {
    setLowerValue(limitInput(target));
    setLowerFieldValue(limitInput(target));
    setUpperSlider(parseInt(target, 10));
  }

  function handleRangeSliderUpperChange(target) {
    setUpperValue(limitInput(target));
    setUpperFieldValue(limitInput(target));
    setLowerSlider(parseInt(target, 10));
  }

  return (
    <div className={`double-range-slider ${className}`}>
      <div className="range-slider-wrap d-flex justify-content-between">
        <div className="range-slider-range-wrap">
          <div className="range-slider-range" style={{ left: `${leftPosition.toString()}%`, width: `${rangeWidth.toString()}%` }} />
        </div>
        <CFormRange
          id="lower"
          className="range-slider range-slider-lower"
          steps={1}
          min={sliderMin}
          max={sliderMax}
          onChange={(e) => handleLowerRangeSliderChange(e.target.value)}
          value={lowerValue}
        />
        <CFormRange
          id="upper"
          className="range-slider range-slider-upper"
          steps={1}
          min={sliderMin}
          max={sliderMax}
          onChange={(e) => handleRangeSliderUpperChange(e.target.value)}
          value={upperValue}
        />
      </div>
      <div className="range-slider-x-axis-labels justify-content-between d-inline-flex w-100 ps-3 pe-3">
        <CFormLabel className="w-100 resort-card__small-label text-start">
          {sliderMin}
        </CFormLabel>
        <CFormLabel className="w-100 resort-card__small-label text-center">
          {sliderMedian}
        </CFormLabel>
        <CFormLabel className="w-100 resort-card__small-label text-end">
          {sliderMax}
        </CFormLabel>
      </div>
      <div className="range-slider-input-wrap mt-2 d-flex justify-content-between p-3">
        <div className="range-slider-input w-100 position-relative">
          <CFormLabel htmlFor="lowerInput" className="w-100 label-inside-input label-inside-input-lower resort-card__small-label">
            Min
          </CFormLabel>
          <CFormInput
            className="lower-input label-inside-input-padding"
            type="number"
            id="lowerInput"
            label="Min"
            placeholder="0"
            min={sliderMin}
            max={sliderMax}
            onBlur={
              (e) => handleLowerRangeSliderChange(e.target.value)
            }
            onChange={(e) => setLowerFieldValue(parseInt(e.target.value, 10))}
            value={lowerFieldValue}
          />
        </div>
        <div className="form-dash-separator d-flex justify-content-center align-items-center">
          -
        </div>
        <div className="range-slider-input w-100 position-relative">
          <CFormLabel htmlFor="upperInput" className="w-100 label-inside-input label-inside-input-upper resort-card__small-label">
            Max
          </CFormLabel>
          <CFormInput
            className="upper-input label-inside-input-padding"
            type="number"
            id="upperInput"
            label="Max"
            placeholder="0"
            min={sliderMin}
            max={sliderMax}
            onBlur={
              (e) => handleRangeSliderUpperChange(e.target.value)
            }
            onChange={(e) => setUpperFieldValue(parseInt(e.target.value, 10))}
            value={upperFieldValue}
          />
        </div>
      </div>
    </div>
  );
};

DoubleRangeSlider.defaultProps = {
  sliderMin: 0,
  sliderMax: 100,
  initialLowerVal: 1,
  initialUpperVal: 100,
  sliderHandleGapPercentage: 2,
  className: '',
};

DoubleRangeSlider.propTypes = {
  sliderMin: PropTypes.number,
  sliderMax: PropTypes.number,
  initialLowerVal: PropTypes.number,
  initialUpperVal: PropTypes.number,
  sliderHandleGapPercentage: PropTypes.number,
  className: PropTypes.string,
};

export default DoubleRangeSlider;
