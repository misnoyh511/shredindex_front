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
import useQueryFilters, { currentFilterState } from '../../hooks/useQueryFilters';
import FilterToggleButtonSkeleton from '../SkeletonState/FilterToggleButtonSkeleton';
import DoubleRangeSlider from '../DoubleRangeSlider/DoubleRangeSlider';

const RankedResortFilters = () => {
  const {
    loading, error, scoreFilters, numericFilters, genericFilters,
  } = useQueryFilters();
  const [formData, setFormData] = useRecoilState(currentFilterState);
  const [showMoreRatings, setShowMoreRatings] = useState(false);
  const [showMoreNumerics, setShowMoreNumerics] = useState(false);
  const [showMoreGenerics, setShowMoreGenerics] = useState(false);

  const getTooltip = (label) => {
    const formattedLabel = label.toUpperCase().replace(/ /g, '_');
    return (
      <FormattedMessage
        id={`shredindex.filterdescription.${formattedLabel}`}
        description={`shredindex.filterdescription.${formattedLabel}`}
        defaultMessage="NO_DESCRIPTION"
      />
    );
  };

  const handleFindIndex = (filterToggleButtonID, type_name, operator) => {
    const indexArray = formData.findIndex((el) => el.filterToggleButtonID === filterToggleButtonID);
    const index = formData[indexArray]?.filters.findIndex(
      (el) => el.type_name === type_name && el.operator === operator,
    );

    return { indexArray, index };
  };

  const updateForm = (filterToggleButtonID, toggleOn, type_name, operator, value) => {

    console.log('updateForm', filterToggleButtonID, toggleOn, type_name, operator, value);
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

    console.log('updatedFormData', updatedFormData);

    setFormData(updatedFormData);
  };

  const getFormValue = (filterToggleButtonID, type_name, operator) => {
    const { indexArray, index } = handleFindIndex(filterToggleButtonID, type_name, operator);
    return index !== -1 ? formData[indexArray].filters[index].value : '';
  };

  if (loading) {
    return (
      <>
        <CFormLabel className="form-label filters__scores">
          <FormattedMessage
            id="shredindex.filter.SCORES"
            defaultMessage="Scores"
          />
        </CFormLabel>
        <FilterToggleButtonSkeleton />
        <FilterToggleButtonSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <p>
        Error Loading filters
      </p>
    );
  }

  return (
    <CForm>
      <CRow>
        <CFormLabel className="form-label filters__scores">
          <FormattedMessage
            id="shredindex.filter.Ratings"
            defaultMessage="Ratings"
          />
        </CFormLabel>
        {scoreFilters?.map((item, filterIndex) => (
          <div>
            {(showMoreRatings || filterIndex < 5) && (
              <FilterToggleButton
                key={item.filterToggleButtonID}
                label={item.label}
                className="mt-4"
                id={item.filterToggleButtonID}
                updateForm={updateForm}
                tooltip={getTooltip(item.label)}
                toggle={item.toggleOn}
              >
                {(id, toggleOn) => (
                  <>
                    <DoubleRangeSlider
                      name={item.filters[0].type_name}
                      unit="%"
                      sliderMin={0}
                      sliderMax={100}
                      initialLowerVal={getFormValue(id, item.filters[0].type_name, item.filters[0].operator)}
                      initialUpperVal={getFormValue(id, item.filters[1].type_name, item.filters[1].operator)}
                      onChangeLower={(e) => {
                        console.log('e', e);
                        console.log('id', id);
                        console.log('item', item);
                        if (item.filters && item.filters[0]) {
                          updateForm(
                            id,
                            toggleOn,
                            item.filters[0].type_name,
                            item.filters[0].operator,
                            e.target.value,
                          );
                        }
                      }}
                      onChangeUpper={(e) => {
                        console.log('e', e);
                        console.log('id', id);
                        console.log('item.filters', item.filters);
                        if (item.filters && item.filters[1]) {
                          updateForm(
                            id,
                            toggleOn,
                            item.filters[1].type_name,
                            item.filters[1].operator,
                            e.target.value,
                          );
                        }
                      }}
                      />
                    {/* {item.filters.map((slider, sliderIndex) => ( */}
                    {/*   <RangeSlider */}
                    {/*     key={slider.type_name + slider.operator} */}
                    {/*     id={`${slider.type_name}_${sliderIndex}`} */}
                    {/*     min={0} */}
                    {/*     max={100} */}
                    {/*     steps={10} */}
                    {/*     toggleOn={toggleOn} */}
                    {/*     value={getFormValue(id, slider.type_name, slider.operator)} */}
                    {/*     onChange={(e) => { */}
                    {/*       console.log('RangeSlider e', e); */}
                    {/*       console.log('RangeSlider id', id); */}
                    {/*       console.log('RangeSlider item.filters', item.filters); */}
                    {/*       if (item.filters && item.filters[0]) { */}
                    {/*         updateForm( */}
                    {/*           id, */}
                    {/*           toggleOn, */}
                    {/*           slider.type_name, */}
                    {/*           slider.operator, */}
                    {/*           e.target.value, */}
                    {/*         ); */}
                    {/*       } */}
                    {/*     }} */}
                    {/*   /> */}
                    {/* ))} */}
                  </>
                )}
              </FilterToggleButton>
            )}
          </div>
        ))}
        <div className="d-flex justify-content-center align-content-center">
          <CButton
            id="showMoreRatings"
            className="mt-4 align-content-center "
            onClick={() => setShowMoreRatings((prevState) => !prevState)}
            label="Show more"
            variant="outline"
            color="light"
            shape="rounded-pill"
          >
            {showMoreRatings
              ? <span>Show less ratings -</span>
              : <span>Show more ratings +</span>}
          </CButton>
        </div>
      </CRow>
      <CRow>
        <hr className="form-hr" />
        <CFormLabel className="form-label filters__stats">
          <FormattedMessage
            id="shredindex.filter.STATS"
            defaultMessage="Stats"
          />
        </CFormLabel>
        {numericFilters?.map((item, filterIndex) => (
          <div>
            {(showMoreNumerics || filterIndex < 5) && (
              <FilterToggleButton
                key={item.filterToggleButtonID}
                label={item.label}
                className="mt-4"
                id={item.filterToggleButtonID}
                updateForm={updateForm}
                tooltip={getTooltip(item.label)}
                toggle={item.toggleOn}
              >
                {(id, toggleOn) => (
                  <>
                    <DoubleRangeSlider
                      name={item.filters[0].type_name}
                      // unit="meters"
                      sliderMin={0}
                      sliderMax={item.max_value}
                      unit={item.unit}
                      initialLowerVal={getFormValue(id, item.filters[0].type_name, item.filters[0].operator)}
                      initialUpperVal={getFormValue(id, item.filters[1].type_name, item.filters[1].operator)}
                      onChangeLower={(e) => {
                        console.log('e', e);
                        console.log('id', id);
                        console.log('item', item);
                        if (item.filters && item.filters[0]) {
                          updateForm(
                            id,
                            toggleOn,
                            item.filters[0].type_name,
                            item.filters[0].operator,
                            e.target.value,
                          );
                        }
                      }}
                      onChangeUpper={(e) => {
                        console.log('e', e);
                        console.log('id', id);
                        console.log('item.filters', item.filters);
                        if (item.filters && item.filters[1]) {
                          updateForm(
                            id,
                            toggleOn,
                            item.filters[1].type_name,
                            item.filters[1].operator,
                            e.target.value,
                          );
                        }
                      }}
                    />
                    {/* {item.filters.map((slider, sliderIndex) => ( */}
                    {/*   <RangeSlider */}
                    {/*     key={slider.type_name + slider.operator} */}
                    {/*     id={`${slider.type_name}_${sliderIndex}`} */}
                    {/*     min={0} */}
                    {/*     max={item.max_value} */}
                    {/*     steps={10} */}
                    {/*     toggleOn={toggleOn} */}
                    {/*     value={getFormValue(id, slider.type_name, slider.operator)} */}
                    {/*     onChange={(e) => { */}
                    {/*       if (item.filters && item.filters[0]) { */}
                    {/*         updateForm( */}
                    {/*           id, */}
                    {/*           toggleOn, */}
                    {/*           slider.type_name, */}
                    {/*           slider.operator, */}
                    {/*           e.target.value, */}
                    {/*         ); */}
                    {/*       } */}
                    {/*     }} */}
                    {/*   /> */}
                    {/* ))} */}
                  </>
                )}
              </FilterToggleButton>
            )}
          </div>
        ))}
        <div className="d-flex justify-content-center align-content-center">
          <CButton
            id="showMoreNumeric"
            className="mt-4"
            onClick={() => setShowMoreNumerics((prevState) => !prevState)}
            label="Show more"
            variant="outline"
            shape="rounded-pill"
          >
            {showMoreNumerics
              ? <span>Show less stats -</span>
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
      {genericFilters?.map((item, filterIndex) => (
        <div>
          {(showMoreGenerics || filterIndex < 5) && (
            <FilterToggleButton
              key={item.filterToggleButtonID}
              label={item.label}
              className="mt-4"
              id={item.filterToggleButtonID}
              updateForm={updateForm}
              tooltip={getTooltip(item.label)}
              toggle={item.toggleOn}
              onChange={() => {
                updateForm(
                  item.id,
                  item.toggleOn,
                  item.filter[0].type_name,
                  '=',
                  item.toggleOn ? 'yes' : 'no',
                );
              }}
            />
          )}
        </div>
      ))}
      <div className="d-flex justify-content-center align-content-center">
        <CButton
          id="showMoreGenerics"
          className="mt-4 "
          onClick={() => setShowMoreGenerics((prevState) => !prevState)}
          label="Show more"
          variant="outline"
          shape="rounded-pill"
        >
          {showMoreGenerics
            ? <span>Show less features -</span>
            : <span>Show more features +</span>}
        </CButton>
      </div>
    </CForm>
  );
};

export default RankedResortFilters;
