import {
  CRow,
  CFormLabel,
  CForm, CButton,
} from '@coreui/react';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import FilterToggleButton from '../FilterToggleButton/FilterToggleButton';
import RangeSlider from '../RangeSlider/RangeSlider';
import useQueryFilters, { currentFilterState } from './useQueryFilters';
import FilterToggleButtonSkeleton from '../SkeletonState/FilterToggleButtonSkeleton';

const RankedResortFilters = () => {
  const { loading, error, scoreFilters, numericFilters, genericFilters } = useQueryFilters();
  const [formData, setFormData] = useRecoilState(currentFilterState);
  const [showMoreScores, setShowMoreScores] = useState(false);
  const [showMoreNumerics, setShowMoreNumerics] = useState(false);
  const [showMoreGenerics, setShowMoreGenerics] = useState(false);
  const toolTip = <FormattedMessage id={'shredindex.filter.SCORES'} description={'shredindex.filter.SCORES'}/>;

  const handleFindIndex = (filterToggleButtonID, type_name, operator) => {
    console.log('filterToggleButtonID, type_name, operator', filterToggleButtonID, type_name, operator);

    const indexArray = formData.findIndex((el) => el.filterToggleButtonID === filterToggleButtonID);
    const index = formData[indexArray]?.filters.findIndex(
      (el) => el.type_name === type_name && el.operator === operator,
    );

    return { indexArray, index };
  };

  const updateForm = (filterToggleButtonID, toggleOn, type_name, operator, value) => {
    const { indexArray, index } = handleFindIndex(filterToggleButtonID, type_name, operator);

    let updatedFormData = JSON.parse(JSON.stringify(formData));

    if (index !== -1) {
    // Working with clone to keep formData intact
      const cloned = { ...updatedFormData[indexArray].filters[index] };

      if (value === null || value === 0 || value === undefined) {
        cloned.value = '';
      } else {
        cloned.value = value;
      }

      updatedFormData[indexArray].filters[index] = cloned;
      updatedFormData[indexArray].toggleOn = toggleOn;
    } else {
    // if indexArray for the filterToggleButtonID exist
      const indexToggleButton = formData.findIndex(
        (el) => el.filterToggleButtonID === filterToggleButtonID,
      );

      if (indexToggleButton !== -1) {
      // update the toggleOn
        updatedFormData[indexToggleButton].toggleOn = toggleOn;
      } else {
      // else push a new object to array
        updatedFormData = [
          ...formData,
          { filterToggleButtonID, toggleOn, filters: [{ type_name, operator, value }] },
        ];
      }
    }

    setFormData(updatedFormData);
  };

  const getFormValue = (filterToggleButtonID, type_name, operator) => {
    const { indexArray, index } = handleFindIndex(filterToggleButtonID, type_name, operator);
    console.log('indexArray index', indexArray, index )
    // console.log('getFormValue', index !== -1 ? formData[indexArray].filters[index].value : '')
    return index !== -1 ? formData[indexArray].filters[index].value : '';
  };

  console.log('formData', formData);
  console.log('scoreFilters', scoreFilters);

  if(loading){
    return <>
      <CFormLabel className="form-label filters__scores">
        <FormattedMessage
          id="shredindex.filter.SCORES"
          defaultMessage="Scores"
        />
      </CFormLabel>
      <FilterToggleButtonSkeleton />
      <FilterToggleButtonSkeleton />
    </>
  }

  return (
    <CForm>
      <CRow>
        <CFormLabel className="form-label filters__scores">
          <FormattedMessage
            id="shredindex.filter.SCORES"
            defaultMessage="Scores"
          />
        </CFormLabel>
        {scoreFilters?.map((item, index) => (
          <>
            {(showMoreScores || index < 5) && (
              <FilterToggleButton
                key={item.filterToggleButtonID}
                label={item.label}
                className="mt-4"
                id={item.filterToggleButtonID}
                updateForm={updateForm}
                tooltip={toolTip}
                toggle={item.toggleOn}
              >
                {(id, toggleOn) => (
                  <>
                    {item.filters.map((slider, index) => (
                      <RangeSlider
                        key={slider.type_name + slider.operator}
                        id={slider.type_name + `_${index}`}
                        min={0}
                        max={100}
                        steps={10}
                        toggleOn={toggleOn}
                        value={getFormValue(id, slider.type_name, slider.operator)}
                        onChange={(e) => {
                          updateForm(id, toggleOn, slider.type_name, slider.operator, e.target.value);
                        }}
                      />))
                    }
                  </>
                )}
              </FilterToggleButton>
            )}
          </>
        ))}
        <div className={'d-flex justify-content-center align-content-center'}>
          <CButton
            id={'showMoreNumeric'}
            className="mt-4 align-content-center "
            onClick={(e) => setShowMoreScores(prevState => !prevState)}
            label={'Show more'}
            variant="outline"
            color="light"
            shape="rounded-pill"
          >
            {showMoreScores ?
              <span>Show less stats -</span>
              : <span>Show more stats +</span>}
          </CButton>
        </div>
      </CRow>
      <hr className="form-hr"/>
      <CRow>
        <CFormLabel className="form-label filters__stats">
          <FormattedMessage
            id="shredindex.filter.STATS"
            defaultMessage="Stats"
          />
        </CFormLabel>
          {numericFilters?.map((item, index) => (
            <>
            {(showMoreNumerics || index < 5) && (
            <FilterToggleButton
              key={item.filterToggleButtonID}
              label={item.label}
              className="mt-4"
              id={item.filterToggleButtonID}
              updateForm={updateForm}
              tooltip={toolTip}
              toggle={item.toggleOn}
            >
              {(id, toggleOn) => (
                <>
                  {item.filters.map((slider, index) => (
                    <RangeSlider
                      key={slider.type_name + slider.operator}
                      id={slider.type_name + `_${index}`}
                      min={0}
                      max={100}
                      steps={10}
                      toggleOn={toggleOn}
                      value={getFormValue(id, slider.type_name, slider.operator)}
                      onChange={(e) => {
                        updateForm(id, toggleOn, slider.type_name, slider.operator, e.target.value);
                      }}
                    />))
                  }
                </>
              )}
            </FilterToggleButton>
            )}
            </>
          ))}
        <div className={'d-flex justify-content-center align-content-center'}>
          <CButton
            id={'showMoreNumeric'}
            className="mt-4"
            onClick={(e) => setShowMoreNumerics(prevState => !prevState)}
            label={'Show more'}
            variant="outline"
            shape="rounded-pill"
          >
            {showMoreNumerics ?
              <span>Show less stats -</span>
              : <span>Show more stats +</span>}
          </CButton>
        </div>
      </CRow>

      <hr className="form-hr" />
      <CFormLabel className="form-label filters__features">
        <FormattedMessage
          id="shredindex.filter.FEATURES"
          defaultMessage="Must have features"
        />
      </CFormLabel>
      {genericFilters?.map((item, index) => (
        <>
          {(showMoreNumerics || index < 5) && (
            <FilterToggleButton
              key={item.filterToggleButtonID}
              label={item.label}
              className="mt-4"
              id={item.filterToggleButtonID}
              updateForm={updateForm}
              tooltip={toolTip}
              toggle={item.toggleOn}
              onChange={(e) => {
                updateForm(id, toggleOn, slider.filter[0].type_name, slider.filter[0].operator, e.target.filter[0].value);
              }}
            />
          )}
        </>
      ))}
      <div className={'d-flex justify-content-center align-content-center'}>
        <CButton
          id={'showMoreGenerics'}
          className="mt-4 "
          onClick={(e) => setShowMoreGenerics(prevState => !prevState)}
          label={'Show more'}
          variant="outline"
          shape="rounded-pill"
        >
          {showMoreGenerics ?
            <span>Show less features -</span>
            : <span>Show more features +</span>}
        </CButton>
      </div>
    </CForm>
  );
};

export default RankedResortFilters;
