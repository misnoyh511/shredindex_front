import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { CFormLabel, CForm } from '@coreui/react';
import { useRecoilState } from 'recoil';
import useQueryFilters from '../../hooks/useQueryTypes';
import { currentFilterState } from '../../atoms/filterState';
import FilterToggleButtonSkeleton from '../SkeletonState/FilterToggleButtonSkeleton';
import useLocalStorageDrivenBooleanState from '../../hooks/useLocalStorageDrivenBooleanState';
import {
  FormData,
  ResortTypeFilters,
  StatisticTypeFilters,
  ScoreTypeFilters,
  FilterGroup,
} from '../../types/filterTypes';
import FilterSection from './../FilterSections/FilterSections';
import { TypeDescription } from '@/TypeDescription/TypeDescription';

const RankedResortFilters: React.FC = () => {
  const {
    loading, error, scoreFilters, numericFilters, genericFilters,
  } = useQueryFilters();
  const [formData, setFormData] = useRecoilState<FormData>(currentFilterState);

  const [showMoreRatings, setShowMoreRatings] = useLocalStorageDrivenBooleanState('showMoreFilters', 'ratings');
  const [showMoreNumerics, setShowMoreNumerics] = useLocalStorageDrivenBooleanState('showMoreFilters', 'numerics');
  const [showMoreGenerics, setShowMoreGenerics] = useLocalStorageDrivenBooleanState('showMoreFilters', 'generics');
  const [showMoreResortTypes, setShowMoreResortTypes] = useLocalStorageDrivenBooleanState('showMoreFilters', 'resortTypes');

  // Create ordered resort type filters based on ResortTypeFilters array
  const resortTypeFilters = ResortTypeFilters
    .reduce<FilterGroup[]>((acc, type) => {
    const filter = genericFilters?.find(
      f => f.filters[0] && f.filters[0].type_name === type,
    );
    if (filter) acc.push(filter);
    return acc;
  }, []);

  // Filter out resort types from generic filters
  const otherGenericFilters = genericFilters?.filter(
    filter => filter.filters[0] && !ResortTypeFilters.includes(filter.filters[0].type_name),
  ) || [];

  // Create ordered statistic filters based on StatisticTypeFilters array
  const statisticFilters = StatisticTypeFilters
    .reduce<FilterGroup[]>((acc, type) => {
    const filter = numericFilters?.find(
      f => f.filters[0] && f.filters[0].type_name === type,
    );
    if (filter) acc.push(filter);
    return acc;
  }, []);

  // Create ordered score filters based on ScoreTypeFilters array
  const orderedScoreFilters = ScoreTypeFilters
    .reduce<FilterGroup[]>((acc, type) => {
    const filter = scoreFilters?.find(
      f => f.filters[0] && f.filters[0].type_name === type,
    );
    if (filter) acc.push(filter);
    return acc;
  }, []);

  const filterDescriptionToolTip = useCallback((label: string) => {
    return (
      <TypeDescription label={label} />
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
      const updatedGroupedType = formData.groupedType.map((group) => {
        if (group.filterToggleButtonID === filterToggleButtonID) {
          const updatedFilters = group.filters.map((filter) => {
            if (filter.type_name === type_name && filter.operator === operator) {
              return { ...filter, value };
            }
            return filter;
          });

          return {
            ...group,
            toggleOn,
            filters: updatedFilters,
          };
        }

        return group;
      });

      const groupExists = updatedGroupedType.some(group => group.filterToggleButtonID === filterToggleButtonID);

      if (!groupExists) {
        updatedGroupedType.push({
          filterToggleButtonID,
          toggleOn,
          filters: [{ type_name, operator, value }],
        });
      }

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
        filters={statisticFilters}
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
        filters={orderedScoreFilters}
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
