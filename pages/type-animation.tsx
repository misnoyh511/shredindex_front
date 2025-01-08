import React, { useState } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CButton,
  CFormLabel,
} from '@coreui/react';
import Rating from '@/Rating/Rating';
import Statistic from '@/Statistic/Statistic';
import {
  StatisticTypeFilters,
  useLifestyleOptions,
} from '../types/filterTypes';
import { TypeDescription } from '@/TypeDescription/TypeDescription';

const formatTitle = (type: string) => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Define units for different statistic types
const statisticUnits: Record<string, string> = {
  skiable_terrain: 'acres',
  vertical_drop: 'm',
  elevation_peak: 'm',
  base_elevation: 'm',
  number_of_runs: 'total',
  number_of_lifts: 'total',
  longest_run: 'km',
  total_runs_distance: 'km',
};

// Define default max values for different statistic types
const defaultMaxValues: Record<string, number> = {
  skiable_terrain: 500,         // 500 km²
  vertical_drop: 2500,          // 2500m
  elevation_peak: 4500,         // 4500m
  base_elevation: 3000,         // 3000m
  number_of_runs: 300,          // 300 runs
  number_of_lifts: 100,         // 100 lifts
  longest_run: 20,              // 20km
  total_runs_distance: 500,      // 500km
};

const TypeAnimation = () => {
  const [componentType, setComponentType] = useState('rating');
  const [typeName, setTypeName] = useState('total_score');
  const [typeValue, setTypeValue] = useState(75);
  const [maxValue, setMaxValue] = useState(100);
  const [key, setKey] = useState(0);

  const lifeStyleOptions = useLifestyleOptions();

  // Get available types based on component type
  const getTypeOptions = () => {
    if (componentType === 'statistic') {
      return StatisticTypeFilters.map(type => ({
        value: type,
        label: formatTitle(type),
      }));
    }
    return lifeStyleOptions;
  };

  const handleComponentTypeChange = (newType: string) => {
    setComponentType(newType);
    const defaultType = newType === 'statistic' ? StatisticTypeFilters[0] : 'total_score';
    setTypeName(defaultType);
    if (newType === 'statistic') {
      setMaxValue(defaultMaxValues[defaultType]);
    } else {
      setMaxValue(100);
    }
  };

  const handleTypeChange = (value: string) => {
    setTypeName(value);
    if (componentType === 'statistic') {
      setMaxValue(defaultMaxValues[value]);
      // Reset the current value if it exceeds the new max
      if (typeValue > defaultMaxValues[value]) {
        setTypeValue(defaultMaxValues[value] / 2);
      }
    }
  };

  const handleRefresh = () => {
    setKey(prevKey => prevKey + 1);
  };

  const renderComponent = () => {
    if (componentType === 'rating') {
      return (
        <Rating
          key={key}
          name={typeName}
          title={formatTitle(typeName)}
          rating={typeValue}
          ratingType="sub-rating"
        />
      );
    } else {
      return (
        <Statistic
          key={key}
          name={typeName}
          title={formatTitle(typeName)}
          statistic={typeValue}
          maxValue={maxValue}
          unit={statisticUnits[typeName]}
        />
      );
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center mt-4">
        <CCol lg={8}>
          <h1 className="mb-4">Type Animations</h1>

          <CCard className="mb-4">
            <CCardHeader>
              <h1>Animation Controls</h1>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <CFormLabel>Component Type</CFormLabel>
                <CFormSelect
                  value={componentType}
                  onChange={(e) => handleComponentTypeChange(e.target.value)}
                  className="mb-3"
                >
                  <option value="rating">Rating</option>
                  <option value="statistic">Statistic</option>
                </CFormSelect>

                <CFormLabel>Type</CFormLabel>
                <CFormSelect
                  value={typeName}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="mb-3"
                >
                  {getTypeOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} {componentType === 'statistic' ? `(${statisticUnits[option.value]})` : ''}
                    </option>
                  ))}
                </CFormSelect>

                <CFormLabel>
                  Value {componentType === 'statistic' && `(${statisticUnits[typeName]})`}
                </CFormLabel>
                <CFormInput
                  type="number"
                  value={typeValue}
                  onChange={(e) => setTypeValue(Number(e.target.value))}
                  className="mb-3"
                  min="0"
                  max={maxValue}
                  step="0.1"
                />

                {componentType === 'statistic' && (
                  <>
                    <CFormLabel>
                      Max Value {`(${statisticUnits[typeName]})`}
                    </CFormLabel>
                    <CFormInput
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(Number(e.target.value))}
                      className="mb-3"
                      min="1"
                      step="0.1"
                    />
                  </>
                )}
              </div>
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>
              <h2>{formatTitle(typeName)}</h2>
            </CCardHeader>
            <CCardBody className="p-2 m-2">
              <div style={{ maxWidth: '10rem' }}>
                {renderComponent()}
                <div color="dark" className={'small fw-light mt-2 text-muted small'}>
                  <TypeDescription label={typeName || 'total_score'}/>
                </div>
                <CButton
                  color="primary"
                  onClick={handleRefresh}
                  className="mt-5"
                >
                  Refresh Animation
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default TypeAnimation;
