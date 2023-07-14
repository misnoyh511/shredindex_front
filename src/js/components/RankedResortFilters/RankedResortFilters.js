import {
  CRow,
  CFormLabel,
  CForm,
} from '@coreui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { atom, useRecoilState } from 'recoil';
import FilterToggleButton from '../FilterToggleButton/FilterToggleButton';
import RangeSlider from '../RangeSlider/RangeSlider';

export const currentFilterState = atom({
  key: 'showCurrentFiltersState',
  default: [
    {
      filterToggleButtonID: 'TotalScoreToggleButton',
      toggleOn: false,
      filters: [{
        type_name: 'total_score',
        operator: '>',
        value: '0',
      },
      {
        type_name: 'total_score',
        operator: '<',
        value: '100',
      }],
    },
    {
      filterToggleButtonID: 'SnowQualityButton',
      toggleOn: false,
      filters: [{
        type_name: 'snow_quality',
        operator: '>',
        value: '0',
      }],
    },
    {
      filterToggleButtonID: 'GenderRatioButton',
      toggleOn: false,
      filters: [{
        type_name: 'gender_ratio',
        operator: '>',
        value: '0',
      }],
    },
  ],
});

const RankedResortFilters = () => {
  const [formData, setFormData] = useRecoilState(currentFilterState);

  const handleFindIndex = (filterToggleButtonID, type_name, operator) => {
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
    return index !== -1 ? formData[indexArray].filters[index].value : '';
  };

  return (
    <CForm>
      <CRow>
        <CFormLabel className="form-label filters__scores">
          <FormattedMessage
            id="shredindex.filter.SCORES"
            defaultMessage="Scores"
          />
        </CFormLabel>
        <FilterToggleButton
          label="Total Score"
          className="mt-4"
          id="TotalScoreToggleButton"
          updateForm={updateForm}
          tooltip={'Snow Quality is a little bit personal, usually dry fine powder snow is considered '
            + 'high quality and Icy or wet and heavy snow is considered low quality'}
        >
          {(id, toggleOn) => (
            <>
              <RangeSlider
                id="total_score_max"
                min={0}
                max={100}
                steps={10}
                toggleOn={toggleOn}
                value={getFormValue(id, 'total_score', '>')}
                onChange={(e) => {
                  updateForm(id, toggleOn, 'total_score', '>', e.target.value);
                }}
              />
              <RangeSlider
                id="total_score_min"
                min={0}
                max={100}
                steps={10}
                toggleOn={toggleOn}
                value={getFormValue(id, 'total_score', '<')}
                onChange={(e) => {
                  updateForm(id, toggleOn, 'total_score', '<', e.target.value);
                }}
              />
            </>
          )}

        </FilterToggleButton>
        <FilterToggleButton
          label="Snow Quality"
          className="mt-4"
          id="SnowQualityButton"
          updateForm={updateForm}
          tooltip={'Snow Quality is a little bit personal, usually dry fine powder snow is considered '
            + 'high quality and Icy or wet and heavy snow is considered low quality'}
        >
          {(id, toggleOn) => (
            <RangeSlider
              id="snow_quality"
              min={0}
              max={100}
              steps={10}
              toggleOn={toggleOn}
              value={getFormValue(id, 'snow_quality', '>')}
              onChange={(e) => {
                updateForm(id, toggleOn, e.target.id, '>', e.target.value);
              }}
            />
          )}
        </FilterToggleButton>
        <FilterToggleButton
          label="Gender Ratio"
          className="mt-4"
          id="GenderRatioButton"
          updateForm={updateForm}
          tooltip={'Snow Quality is a little bit personal, usually dry fine powder snow is considered '
            + 'high quality and Icy or wet and heavy snow is considered low quality'}
        >
          {(id, toggleOn) => (
            <RangeSlider
              id="gender_ratio"
              min={0}
              max={100}
              steps={10}
              toggleOn={toggleOn}
              value={getFormValue(id, 'gender_ratio', '>')}
              onChange={(e) => {
                updateForm(id, toggleOn, e.target.id, '>', e.target.value);
              }}
            />
          )}
        </FilterToggleButton>
      </CRow>
      <hr className="form-hr" />
      <CFormLabel className="form-label filters__stats">
        <FormattedMessage
          id="shredindex.filter.STATS"
          defaultMessage="Stats"
        />
      </CFormLabel>
      <hr className="form-hr" />
      <CFormLabel className="form-label filters__features">
        <FormattedMessage
          id="shredindex.filter.FEATURES"
          defaultMessage="Features"
        />
      </CFormLabel>
    </CForm>
  );
};

export default RankedResortFilters;
