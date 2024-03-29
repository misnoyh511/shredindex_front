import React, { useState } from 'react';
import {
  CFormRange, CFormInput, CFormLabel,
} from '@coreui/react';
import PropTypes from 'prop-types';
import titleCase from '../../hooks/textFomatting';
import RangeRheostatGraph from '../Rheostat/RangeRheostatGraph';

const DoubleRangeSlider = ({
  name, unit, sliderMin, sliderMax, initialLowerVal, initialUpperVal, sliderHandleGapPercentage, className, onChangeLower, onChangeUpper, useGraph
}) => {
  const [lowerValue, setLowerValue] = useState(initialLowerVal);
  const [upperValue, setUpperValue] = useState(initialUpperVal);
  const [lowerFieldValue, setLowerFieldValue] = useState(lowerValue);
  const [upperFieldValue, setUpperFieldValue] = useState(upperValue);
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

  function handleLowerRangeSliderChange(e) {
    setLowerValue(limitInput(e.target.value));
    setLowerFieldValue(limitInput(e.target.value));
    setUpperSlider(parseInt(e.target.value, 10));
    onChangeLower(e);
    // onChangeUpper(upperValue.toString());
  }

  function handleRangeSliderUpperChange(e) {
    setUpperValue(limitInput(e.target.value));
    setUpperFieldValue(limitInput(e.target.value));
    setLowerSlider(parseInt(e.target.value, 10));
    // onChangeLower(lowerValue.toString());
    onChangeUpper(e);
  }

  return (
    <div className={`double-range-slider ${className}`}>
      {useGraph
        && (
          <RangeRheostatGraph
            typeName={name}
            leftPosition={leftPosition}
            rightPosition={rightPosition}
            sliderMin={sliderMin}
            sliderMax={sliderMax}
            upperValue={upperValue}
            lowerValue={lowerValue}
            graphTickerQuantity={20}
          />
        )}
      <div className="range-slider-wrap d-flex justify-content-between">
        <div className="range-slider-range-wrap">
          <div className="range-slider-range" style={{ left: `${leftPosition.toString()}%`, width: `${rangeWidth.toString()}%` }} />
        </div>
        <CFormRange
          id={`${name}_lower`}
          className="range-slider range-slider-lower"
          steps={1}
          min={sliderMin}
          max={sliderMax}
          onChange={(e) => {handleLowerRangeSliderChange(e); }}
          value={lowerValue}
        />
        <CFormRange
          id={`${name}_upper`}
          className="range-slider range-slider-upper"
          steps={1}
          min={sliderMin}
          max={sliderMax}
          onChange={(e) => {
            handleRangeSliderUpperChange(e); }}
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
          <CFormLabel htmlFor={`${name}_lower_input`} className="w-100 label-inside-input label-inside-input-lower resort-card__small-label">
            Min - {titleCase(name)}
            {/* {unit.toString()} */}
          </CFormLabel>
          <CFormInput
            className="lower-input label-inside-input-padding"
            type="number"
            id={`${name}_lower_input`}
            label=""
            placeholder="0"
            min={sliderMin}
            max={sliderMax}
            onBlur={
              (e) => handleLowerRangeSliderChange(e)
            }
            onChange={(e) => {
              setLowerFieldValue(parseInt(e.target.value, 10));
            }}
            value={lowerFieldValue}
          />
        </div>
        <div className="form-dash-separator d-flex justify-content-center align-items-center">
          -
        </div>
        <div className="range-slider-input w-100 position-relative">
          <CFormLabel htmlFor={`${name}_upper_input`} className="w-100 label-inside-input label-inside-input-upper resort-card__small-label">
            Max - {titleCase(name)}
            {/* {unit} */}
          </CFormLabel>
          <CFormInput
            className="upper-input label-inside-input-padding"
            type="number"
            id={`${name}_upper_input`}
            label=""
            placeholder="0"
            min={sliderMin}
            max={sliderMax}
            onBlur={
              (e) => handleRangeSliderUpperChange(e)
            }
            onChange={(e) => {
              setUpperFieldValue(parseInt(e.target.value, 10));
            }}
            value={upperFieldValue}
          />
        </div>
      </div>
    </div>
  );
};

DoubleRangeSlider.defaultProps = {
  name: '',
  sliderMin: 0,
  sliderMax: 100,
  initialLowerVal: 0,
  initialUpperVal: 100,
  sliderHandleGapPercentage: 2,
  className: '',
  onChangeLower: () => {},
  onChangeUpper: () => {},
  useGraph: false,
};

DoubleRangeSlider.propTypes = {
  name: PropTypes.string,
  sliderMin: PropTypes.number,
  sliderMax: PropTypes.number,
  initialLowerVal: PropTypes.number,
  initialUpperVal: PropTypes.number,
  sliderHandleGapPercentage: PropTypes.number,
  className: PropTypes.string,
  onChangeLower: PropTypes.func,
  onChangeUpper: PropTypes.func,
  useGraph: PropTypes.bool,
};

export default DoubleRangeSlider;
