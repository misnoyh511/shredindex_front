import React, { useCallback } from 'react';
import {
  CRow, CFormLabel, CForm, CButton,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import FilterToggleButton from '../FilterToggleButton/FilterToggleButton';
import useQueryFilters, { currentFilterState } from '../../hooks/useQueryTypes';
import FilterToggleButtonSkeleton from '../SkeletonState/FilterToggleButtonSkeleton';
import DoubleRangeSlider from '../DoubleRangeSlider/DoubleRangeSlider';
import useLocalStorageDrivenBooleanState from '../../hooks/useLocalStorageDrivenBooleanState';
import { FormData, FilterGroup } from '../../types/filterTypes';

const RankedResortFilters: React.FC = () => {
  const {
    loading, error, scoreFilters, numericFilters, genericFilters,
  } = useQueryFilters();
  const [formData, setFormData] = useRecoilState<FormData>(currentFilterState);

  const [showMoreRatings, setShowMoreRatings] = useLocalStorageDrivenBooleanState('showMoreFilters', 'ratings');
  const [showMoreNumerics, setShowMoreNumerics] = useLocalStorageDrivenBooleanState('showMoreFilters', 'numerics');
  const [showMoreGenerics, setShowMoreGenerics] = useLocalStorageDrivenBooleanState('showMoreFilters', 'generics');

  const filterDescriptionToolTip = useCallback((label: string) => {
    const formattedLabel = label.toUpperCase().replace(/ /g, '_');
    return (
      <FormattedMessage
        id={`shredindex.filterdescription.${formattedLabel}`}
        description={`shredindex.filterdescription.${formattedLabel}`}
        defaultMessage="NO_DESCRIPTION"
      />
    );
  }, []);

  const handleFindIndex = useCallback((filterToggleButtonID: string, type_name: string, operator: string) => {
    const indexArray = formData.groupedType.findIndex(
      (el) => el.filterToggleButtonID === filterToggleButtonID,
    );
    const index = indexArray !== -1 ? formData.groupedType[indexArray].filters.findIndex(
      (el) => el.type_name === type_name && el.operator === operator,
    ) : -1;
    return { indexArray, index };
  }, [formData]);

  const updateForm = useCallback(
    (filterToggleButtonID: string, toggleOn: boolean, type_name: string, operator: string, value: string) => {
      // Clone the current formData and find the group with the matching filterToggleButtonID
      const updatedGroupedType = formData.groupedType.map((group) => {
        if (group.filterToggleButtonID === filterToggleButtonID) {
          // Update the filters in the existing group
          const updatedFilters = group.filters.map((filter) => {
            if (filter.type_name === type_name && filter.operator === operator) {
              return { ...filter, value }; // Update the filter value
            }
            return filter; // Leave other filters untouched
          });

          return {
            ...group,
            toggleOn,
            filters: updatedFilters, // Replace filters with updated ones
          };
        }

        return group; // Return other groups untouched
      });

      // If no group with matching ID exists, add a new group
      const groupExists = updatedGroupedType.some(group => group.filterToggleButtonID === filterToggleButtonID);

      if (!groupExists) {
        updatedGroupedType.push({
          filterToggleButtonID,
          toggleOn,
          filters: [{ type_name, operator, value }],
        });
      }

      // Set the updated state immutably
      setFormData((prev) => ({
        ...prev,
        groupedType: updatedGroupedType,
      }));
    },
    [formData, setFormData],
  );

  const handleUpdateForm = useCallback((id: string, value: boolean): Promise<void> => {
    return new Promise((resolve) => {
      const item = formData.groupedType.find(el => el.filterToggleButtonID === id);
      if (item && item.filters.length > 0) {
        updateForm(id, value, item.filters[0].type_name, item.filters[0].operator, value ? 'yes' : 'no');
      }
      resolve();
    });
  }, [formData, updateForm]);

  const getFormValue = useCallback((filterToggleButtonID: string, type_name: string, operator: string) => {
    const { indexArray, index } = handleFindIndex(filterToggleButtonID, type_name, operator);
    return indexArray !== -1 && index !== -1 ? formData.groupedType[indexArray].filters[index].value : '';
  }, [formData, handleFindIndex]);

  if (loading) {
    return (
      <>
        <CFormLabel className="form-label filters__scores">
          <FormattedMessage
            id="shredindex.filter.SCORES"
            defaultMessage="Scores"
          />
        </CFormLabel>
        {Array(8).fill(null).map((_, index) => (
          <FilterToggleButtonSkeleton key={index} />
        ))}
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
        {scoreFilters?.map((item: FilterGroup, filterIndex: number) => (
          (showMoreRatings || filterIndex < 5) && (
            <FilterToggleButton
              key={item.filterToggleButtonID}
              label={item.label || ''}
              name={item.name}
              className="mt-4"
              id={item.filterToggleButtonID}
              updateForm={handleUpdateForm}
              tooltip={filterDescriptionToolTip(item.label || '')}
              toggle={item.toggleOn}
            >
              {(id: string, toggleOn: boolean) => (
                item.filters && item.filters[0] && item.filters[1] ? ( // Ensure filters exist before rendering
                  <DoubleRangeSlider
                    title={item.label || ''}
                    name={item.filters[0].type_name}
                    unit={item.unit}
                    sliderMin={0}
                    sliderMax={100}
                    initialLowerVal={
                      parseInt(
                        getFormValue(id, item.filters[0].type_name, item.filters[0].operator),
                        10,
                      ) || 0
                    }
                    initialUpperVal={
                      parseInt(
                        getFormValue(id, item.filters[1].type_name, item.filters[1].operator),
                        10,
                      ) || 100
                    }
                    onChangeLower={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateForm(
                        id,
                        toggleOn,
                        item.filters[0].type_name,
                        item.filters[0].operator,
                        e.target.value,
                      );
                    }}
                    onChangeUpper={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateForm(
                        id,
                        toggleOn,
                        item.filters[1].type_name,
                        item.filters[1].operator,
                        e.target.value,
                      );
                    }}
                    useGraph
                  />
                ) : null
              )}
            </FilterToggleButton>
          )
        ))}
        <div className="d-flex justify-content-center align-content-center">
          <CButton
            id="showMoreRatings"
            className="mt-4 align-content-center "
            onClick={() => setShowMoreRatings((prevState: unknown) => !prevState)}
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
              updateForm={handleUpdateForm}
              tooltip={filterDescriptionToolTip(item.label || '')}
              toggle={item.toggleOn}
            >
              {(id, toggleOn) => (
                <DoubleRangeSlider
                  title={item.label}
                  name={item.filters[0].type_name}
                  sliderMin={0}
                  sliderMax={item?.max_value || 100}
                  unit={item.unit}
                  initialLowerVal={
                    parseInt(
                      getFormValue(id, item.filters[0].type_name, item.filters[0].operator),
                      10,
                    ) || 0
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
            updateForm={handleUpdateForm}
            tooltip={filterDescriptionToolTip(item.label || '')}
            toggle={item.toggleOn}
            onChange={(e) => {
              if (item.filters && item.filters[0]) {
                updateForm(
                  item.filterToggleButtonID,
                  item.toggleOn,
                  item.filters[0].type_name,
                  item.filters[0].operator,
                  e.target.value,
                );
              }
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
