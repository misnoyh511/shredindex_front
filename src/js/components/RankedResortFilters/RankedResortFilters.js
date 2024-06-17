import {
  CRow, CFormLabel, CForm, CButton,
} from '@coreui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import FilterToggleButton from '../FilterToggleButton/FilterToggleButton';
import useQueryFilters, { currentFilterState } from '../../hooks/useQueryTypes';
import FilterToggleButtonSkeleton from '../SkeletonState/FilterToggleButtonSkeleton';
import DoubleRangeSlider from '../DoubleRangeSlider/DoubleRangeSlider';
import useLocalStorageDrivenBooleanState from '../../hooks/useLocalStorageDrivenBooleanState';

const RankedResortFilters = () => {
  const {
    loading, error, scoreFilters, numericFilters, genericFilters,
  } = useQueryFilters();
  const [formData, setFormData] = useRecoilState(currentFilterState);

  // Use your hook for each show more state with local storage
  const [showMoreRatings, setShowMoreRatings] = useLocalStorageDrivenBooleanState('showMoreFilters', 'ratings');
  const [showMoreNumerics, setShowMoreNumerics] = useLocalStorageDrivenBooleanState('showMoreFilters', 'numerics');
  const [showMoreGenerics, setShowMoreGenerics] = useLocalStorageDrivenBooleanState('showMoreFilters', 'generics');

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
    const indexArray = formData.groupedType.findIndex(
      (el) => el.filterToggleButtonID === filterToggleButtonID,
    );
    const index = formData.groupedType[indexArray]?.filters.findIndex(
      (el) => el.type_name === type_name && el.operator === operator,
    );
    return { indexArray, index };
  };

  const updateForm = (filterToggleButtonID, toggleOn, type_name, operator, value) => {
    const { indexArray, index } = handleFindIndex(filterToggleButtonID, type_name, operator);
    const updatedFormData = JSON.parse(JSON.stringify(formData));
    if (index !== -1) {
      // Working with clone to keep formData intact
      const cloned = { ...updatedFormData.groupedType[indexArray].filters[index] };
      if (value === null || value === 0 || value === undefined) {
        cloned.value = '';
      } else {
        cloned.value = value;
      }
      updatedFormData.groupedType[indexArray].filters[index] = cloned;
      updatedFormData.groupedType[indexArray].toggleOn = toggleOn;
    } else {
      // if indexArray for the filterToggleButtonID exist
      const indexToggleButton = formData.groupedType.findIndex(
        (el) => el.filterToggleButtonID === filterToggleButtonID,
      );
      if (indexToggleButton !== -1) {
        // Update the toggleOn for the existing filterToggleButtonID
        updatedFormData.groupedType[indexToggleButton].toggleOn = toggleOn;
      } else {
        // Push a new object to the array
        updatedFormData.groupedType.push({
          filterToggleButtonID,
          toggleOn,
          filters: [{ type_name, operator, value }],
        });
      }
    }
    setFormData(updatedFormData);
  };

  const getFormValue = (filterToggleButtonID, type_name, operator) => {
    const { indexArray, index } = handleFindIndex(filterToggleButtonID, type_name, operator);
    return index !== -1 ? formData.groupedType[indexArray].filters[index].value : '';
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
        <FilterToggleButtonSkeleton />
        <FilterToggleButtonSkeleton />
        <FilterToggleButtonSkeleton />
        <FilterToggleButtonSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <p>Error Loading filters</p>
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
          (showMoreRatings || filterIndex < 5) && (
            <FilterToggleButton
              key={item.filterToggleButtonID}
              label={item.label}
              name={item.name}
              className="mt-4"
              id={item.filterToggleButtonID}
              updateForm={updateForm}
              tooltip={getTooltip(item.label)}
              toggle={item.toggleOn}
            >
              {(id, toggleOn) => (
                <DoubleRangeSlider
                  title={item.label}
                  name={item.filters[0].type_name}
                  unit={item.unit}
                  sliderMin={0}
                  sliderMax={100}
                  initialLowerVal={
                    parseInt(
                      getFormValue(id, item.filters[0].type_name, item.filters[0].operator),
                      10,
                    )
                  }
                  initialUpperVal={
                    parseInt(
                      getFormValue(id, item.filters[1].type_name, item.filters[1].operator),
                      10,
                    )
                  }
                  onChangeLower={(e) => {
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
                  useGraph
                />
              )}
            </FilterToggleButton>
          )
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
          (showMoreNumerics || filterIndex < 5) && (
            <FilterToggleButton
              key={item.filterToggleButtonID}
              label={item.label}
              name={item.name}
              className="mt-4"
              id={item.filterToggleButtonID}
              updateForm={updateForm}
              tooltip={getTooltip(item.label)}
              toggle={item.toggleOn}
            >
              {(id, toggleOn) => (
                <DoubleRangeSlider
                  title={item.label}
                  name={item.filters[0].type_name}
                  sliderMin={0}
                  sliderMax={item.max_value}
                  unit={item.unit}
                  initialLowerVal={
                    parseInt(
                      getFormValue(id, item.filters[0].type_name, item.filters[0].operator),
                      10,
                    )
                  }
                  initialUpperVal={
                    parseInt(
                      getFormValue(id, item.filters[1].type_name, item.filters[1].operator),
                      10,
                    )
                  }
                  onChangeLower={(e) => {
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
              )}
            </FilterToggleButton>
          )
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
        (showMoreGenerics || filterIndex < 5) && (
          <FilterToggleButton
            key={item.filterToggleButtonID}
            label={item.label}
            name={item.name}
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
        )
      ))}
      {(genericFilters.length > 5) && (
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
      )}
    </CForm>
  );
};

export default RankedResortFilters;
