import React, { useState } from 'react';
import {
  CFormRange, CFormInput, CFormLabel,
} from '@coreui/react';
import RangeRheostatGraph from '../Rheostat/RangeRheostatGraph';
import titleCase from '../../hooks/textFomatting';
import getUnit from '../../hooks/getUnit';

interface DoubleRangeSliderProps {
  title?: string;
  name?: string;
  unit?: string;
  sliderMin?: number;
  sliderMax?: number;
  initialLowerVal?: number;
  initialUpperVal?: number;
  sliderHandleGapPercentage?: number;
  className?: string;
  onChangeLower?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUpper?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  useGraph?: boolean;
}

const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({
  title = '',
  name = '',
  unit = '',
  sliderMin = 0,
  sliderMax = 100,
  initialLowerVal = 0,
  initialUpperVal = 100,
  sliderHandleGapPercentage = 2,
  className = '',
  onChangeLower = () => {},
  onChangeUpper = () => {},
  useGraph = false,
}) => {
  const [lowerValue, setLowerValue] = useState<number>(initialLowerVal);
  const [upperValue, setUpperValue] = useState<number>(initialUpperVal);
  const [lowerFieldValue, setLowerFieldValue] = useState<number>(lowerValue);
  const [upperFieldValue, setUpperFieldValue] = useState<number>(upperValue);

  const sliderMedian = ((sliderMin + sliderMax) / 2).toFixed(0);
  const sliderHandleGap = Math.round((sliderMax - sliderMin) * (sliderHandleGapPercentage / 100));

  const widthSpanPercent = 100 / (sliderMax - sliderMin);
  const leftPosition = (lowerValue - sliderMin) * widthSpanPercent;
  const rightPosition = (upperValue - sliderMin) * widthSpanPercent;
  const rangeWidth = (rightPosition + sliderMin) - (leftPosition + sliderMin);

  const setLowerSlider = (targetUpperValue: number) => {
    if (lowerValue > targetUpperValue - sliderHandleGap || targetUpperValue < lowerValue + sliderHandleGap) {
      if (targetUpperValue >= sliderMax) {
        const newLowerValue = sliderMax - sliderHandleGap;
        setLowerValue(newLowerValue);
        setLowerFieldValue(newLowerValue);
      }
      const newValue = Math.max(targetUpperValue - sliderHandleGap, sliderMin);
      setLowerValue(newValue);
      setLowerFieldValue(newValue);
      if (targetUpperValue <= sliderMin + sliderHandleGap) {
        const newUpperValue = sliderMin + sliderHandleGap;
        setUpperValue(newUpperValue);
        setUpperFieldValue(newUpperValue);
      }
    }
  };

  const setUpperSlider = (targetLowerValue: number) => {
    if (targetLowerValue > upperValue - sliderHandleGap || upperValue < targetLowerValue + sliderHandleGap) {
      if (targetLowerValue < sliderMax - sliderHandleGap) {
        const newUpperValue = targetLowerValue + sliderHandleGap;
        setUpperValue(newUpperValue);
        setUpperFieldValue(newUpperValue);
      }
      const newValue = Math.min(targetLowerValue + sliderHandleGap, sliderMax);
      setUpperValue(newValue);
      setUpperFieldValue(newValue);
      if (targetLowerValue >= sliderMax - sliderHandleGap) {
        const newLowerValue = sliderMax - sliderHandleGap;
        setLowerValue(newLowerValue);
        setLowerFieldValue(newLowerValue);
      }
    }
  };

  const limitInput = (target: number): number => {
    if (target > sliderMax) return sliderMax;
    if (target < sliderMin) return sliderMin;
    return target;
  };

  const handleLowerRangeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitInput(parseInt(e.target.value, 10));
    setLowerValue(value);
    setLowerFieldValue(value);
    setUpperSlider(value);
    onChangeLower(e);
  };

  const handleRangeSliderUpperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = limitInput(parseInt(e.target.value, 10));
    setUpperValue(value);
    setUpperFieldValue(value);
    setLowerSlider(value);
    onChangeUpper(e);
  };

  return (
    <div className={`double-range-slider ${className}`}>
      {useGraph && (
        <RangeRheostatGraph
          typeName={name || ''}
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
          <div
            className="range-slider-range"
            style={{ left: `${leftPosition}%`, width: `${rangeWidth}%` }}
          />
        </div>
        <CFormRange
          id={`${name}_lower`}
          className="range-slider range-slider-lower"
          step={1}
          min={sliderMin}
          max={sliderMax}
          onChange={handleLowerRangeSliderChange}
          value={lowerValue}
        />
        <CFormRange
          id={`${name}_upper`}
          className="range-slider range-slider-upper"
          step={1}
          min={sliderMin}
          max={sliderMax}
          onChange={handleRangeSliderUpperChange}
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
            Min -
            {' '}
            {titleCase(title || '')}
            {unit && getUnit({ unit }) ? ` (${getUnit({ unit })})` : ''}
          </CFormLabel>
          <CFormInput
            className="lower-input label-inside-input-padding"
            type="number"
            id={`${name}_lower_input`}
            placeholder="0"
            min={sliderMin}
            max={sliderMax}
            onBlur={handleLowerRangeSliderChange}
            onChange={(e) => setLowerFieldValue(parseInt(e.target.value, 10))}
            value={lowerFieldValue}
          />
        </div>
        <div className="form-dash-separator d-flex justify-content-center align-items-center">
          -
        </div>
        <div className="range-slider-input w-100 position-relative">
          <CFormLabel htmlFor={`${name}_upper_input`} className="w-100 label-inside-input label-inside-input-upper resort-card__small-label">
            Max -
            {' '}
            {titleCase(title || '')}
            {unit && getUnit({ unit }) ? ` (${getUnit({ unit })})` : ''}
          </CFormLabel>
          <CFormInput
            className="upper-input label-inside-input-padding"
            type="number"
            id={`${name}_upper_input`}
            placeholder="0"
            min={sliderMin}
            max={sliderMax}
            onBlur={handleRangeSliderUpperChange}
            onChange={(e) => setUpperFieldValue(parseInt(e.target.value, 10))}
            value={upperFieldValue}
          />
        </div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
