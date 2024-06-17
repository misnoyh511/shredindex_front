import { useState, useLayoutEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { gql, useQuery } from '@apollo/client';

export const QUERY_TYPES = gql`
  {
    types {
      name
      title
      category
      unit
      unit_id
      icon
      max_value
    }
  }
`;

function getCurrentFilterFromUrl() {
  const params = new URLSearchParams(window.location.search);
  let locationType = {};

  try {
    const filters = params.get('filters');

    if (filters) {
      const parsedFilters = JSON.parse(filters);

      if (parsedFilters.locationType) {
        locationType = parsedFilters.locationType;
      }

      if (parsedFilters?.length >= 1) {
        // Create a reducer to group your filters by type_name
        const filterGroups = parsedFilters.reduce((tempGroups, score) => {
          const groups = { ...tempGroups };

          if (!groups[score.type_name]) {
            groups[score.type_name] = {
              label: score.title,
              filterToggleButtonID: `${score.type_name}ToggleButton`,
              toggleOn: true,
              filters: [],
            };
          }

          // It is an array of filters, even if they have the same type_name
          groups[score.type_name].filters.push(score);

          return groups;
        }, {});

        // Transform the object of groups into an array
        const groupedFilters = Object.values(filterGroups);

        return {
          groupedFilters,
          locationType,
        };
      }
    }
  } catch (error) { /* empty */ }

  return { groupedFilters: [], locationType };
}

const urlFilterParams = getCurrentFilterFromUrl();
export const currentFilterState = atom({
  key: 'showCurrentFiltersState',
  default: {
    groupedType: urlFilterParams.groupedFilters,
    locationType: urlFilterParams.locationType,
  },
});

const UseQueryTypes = () => {
  const { loading, error, data } = useQuery(QUERY_TYPES);
  const [scoreFilters, setScoreFilters] = useState([]);
  const [numericFilters, setNumericFilters] = useState([]);
  const [genericFilters, setGenericFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useRecoilState(currentFilterState);

  useLayoutEffect(() => {
    let newScores = [];
    let newCurrentFilters = [];
    let newNumerics = [];
    let newGenerics = [];
    if (data) {
      const scores = data.types.filter((item) => (item?.category === 'Underflip\\Resorts\\Models\\Rating'));
      const numerics = data.types.filter((item) => (item?.category === 'Underflip\\Resorts\\Models\\Numeric'));
      const generics = data.types.filter((item) => (item?.category === 'Underflip\\Resorts\\Models\\Generic'));

      scores.forEach((score) => {
        const scoreObject = {
          label: score.title,
          name: score.name,
          filterToggleButtonID: `${score.name}ToggleButton`,
          toggleOn: false,
          unit: score?.unit,
          filters: [{
            type_name: score.name,
            operator: '>',
            value: '0',
          },
          {
            type_name: score.name,
            operator: '<',
            value: '100',
          }],
        };

        currentFilter.groupedType.forEach((current) => {
          if (current.filterToggleButtonID === scoreObject.filterToggleButtonID) {
            scoreObject.toggleOn = current.toggleOn;
            scoreObject.filters = current.filters;
          }
        });

        newScores = [...newScores, scoreObject];
      });

      numerics?.forEach((numeric) => {
        const numericObject = {
          label: numeric?.title,
          filterToggleButtonID: `${numeric.name}ToggleButton`,
          toggleOn: false,
          name: numeric?.name,
          max_value: numeric?.max_value || null,
          unit: numeric?.unit,
          filters: [{
            type_name: numeric.name,
            operator: '>',
            value: '0',
          },
          {
            type_name: numeric.name,
            operator: '<',
            value: numeric?.max_value || '100',
          }],
        };

        currentFilter.groupedType.forEach((current) => {
          if (current.filterToggleButtonID === numericObject.filterToggleButtonID) {
            numericObject.toggleOn = current.toggleOn;
            numericObject.filters = current.filters;
          }
        });

        newNumerics = [...newNumerics, numericObject];
      });

      generics.forEach((generic) => {
        const genericObject = {
          label: generic.title,
          name: generic.name,
          filterToggleButtonID: `${generic.name}ToggleButton`,
          toggleOn: false,
          filters: [{
            type_name: generic.name,
            operator: '=',
            value: 'yes',
          }],
        };

        currentFilter.groupedType.forEach((current) => {
          if (current.filterToggleButtonID === genericObject.filterToggleButtonID) {
            genericObject.toggleOn = current.toggleOn;
            genericObject.filters = current.filters;
          }
        });

        newGenerics = [...newGenerics, genericObject];
      });

      setScoreFilters(() => newScores);
      setNumericFilters(() => newNumerics);
      setGenericFilters(() => newGenerics);
      newCurrentFilters = [...newScores, ...newNumerics, ...newGenerics];
      const groupedFilterAndLocation = {
        groupedType: newCurrentFilters,
        locationType: currentFilter.locationType,
      };
      setCurrentFilter(() => groupedFilterAndLocation);
    }
  }, [data]);

  return {
    loading, error, scoreFilters, numericFilters, genericFilters, currentFilter,
  };
};

export default UseQueryTypes;
