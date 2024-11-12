import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  CFormLabel, CForm,
} from '@coreui/react';
import { useRecoilState } from 'recoil';
import useQueryFilters from '../../hooks/useQueryTypes';
import { currentFilterState } from '../../atoms/filterState';
import FilterToggleButtonSkeleton from '../SkeletonState/FilterToggleButtonSkeleton';
import useLocalStorageDrivenBooleanState from '../../hooks/useLocalStorageDrivenBooleanState';
import { FormData, ResortTypeFilters } from '../../types/filterTypes';
import FilterSection from './../FilterSections/FilterSections';

const RankedResortFilters: React.FC = () => {
  const {
    loading, error, scoreFilters, numericFilters, genericFilters,
  } = useQueryFilters();
  const [formData, setFormData] = useRecoilState<FormData>(currentFilterState);

  const [showMoreRatings, setShowMoreRatings] = useLocalStorageDrivenBooleanState('showMoreFilters', 'ratings');
  const [showMoreNumerics, setShowMoreNumerics] = useLocalStorageDrivenBooleanState('showMoreFilters', 'numerics');
  const [showMoreGenerics, setShowMoreGenerics] = useLocalStorageDrivenBooleanState('showMoreFilters', 'generics');
  const [showMoreResortTypes, setShowMoreResortTypes] = useLocalStorageDrivenBooleanState('showMoreFilters', 'resortTypes');

  // Split genericFilters into resort types and other features
  const resortTypeFilters = ResortTypeFilters
    .map(type => genericFilters?.find(
      filter => filter.filters[0] && filter.filters[0].type_name === type,
    ))
    .filter((filter): filter is FilterGroup => !!filter);

  const otherGenericFilters = genericFilters?.filter(
    filter => filter.filters[0] && !ResortTypeFilters.includes(filter.filters[0].type_name),
  );

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
        <CFormLabel className="form-label filters__resort_types">
          <FormattedMessage
            id="shredindex.filter.RESORT_TYPES"
            defaultMessage="Resort type"
          />
        </CFormLabel>
        {Array(8).fill(null).map((_, index) => (
          <FilterToggleButtonSkeleton key={index} />
        ))}
      </>
    );
  }

  if (error) {
    return <p>Error Loading filters</p>;
  }

  return (
    <CForm>
      <FilterSection
        title="Resort type"
        titleId="shredindex.filter.RESORT_TYPES"
        filters={resortTypeFilters}
        showMore={showMoreResortTypes}
        onToggleShowMore={setShowMoreResortTypes}
        handleUpdateForm={handleUpdateForm}
        updateForm={updateForm}
        getFormValue={getFormValue}
        filterDescriptionToolTip={filterDescriptionToolTip}
        showMoreButtonText="Show more resort types +"
        showLessButtonText="Show less resort types -"
      />
      <hr className="form-hr"/>

      <FilterSection
        title="Must have features"
        titleId="shredindex.filter.FEATURES"
        filters={otherGenericFilters}
        showMore={showMoreGenerics}
        onToggleShowMore={setShowMoreGenerics}
        handleUpdateForm={handleUpdateForm}
        updateForm={updateForm}
        getFormValue={getFormValue}
        filterDescriptionToolTip={filterDescriptionToolTip}
        showMoreButtonText="Show more features +"
        showLessButtonText="Show less features -"
      />
      <hr className="form-hr"/>

      <FilterSection
        title="Stats"
        titleId="shredindex.filter.STATS"
        filters={numericFilters}
        showMore={showMoreNumerics}
        onToggleShowMore={setShowMoreNumerics}
        handleUpdateForm={handleUpdateForm}
        updateForm={updateForm}
        getFormValue={getFormValue}
        filterDescriptionToolTip={filterDescriptionToolTip}
        showMoreButtonText="Show more stats +"
        showLessButtonText="Show less stats -"
        useRangeSlider
      />
      <hr className="form-hr"/>

      <FilterSection
        title="Ratings"
        titleId="shredindex.filter.Ratings"
        filters={scoreFilters}
        showMore={showMoreRatings}
        onToggleShowMore={setShowMoreRatings}
        handleUpdateForm={handleUpdateForm}
        updateForm={updateForm}
        getFormValue={getFormValue}
        filterDescriptionToolTip={filterDescriptionToolTip}
        showMoreButtonText="Show more ratings +"
        showLessButtonText="Show less ratings -"
        useRangeSlider
      />
      <hr className="form-hr"/>

    </CForm>
  );
};

export default RankedResortFilters;
