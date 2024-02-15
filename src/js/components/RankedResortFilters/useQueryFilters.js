import React, { useState, useLayoutEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

export const QUERY_FILTERS = gql`
  {
    filters {
      name
      title
      category
      unit_id
    }
  }
`;

function getCurrentFilterFromUrl() {

  const params = new URLSearchParams(window.location.search)
  let paramsLoaded = false;

  try {
    const filters = params.get('filters');
    if (filters) {
      const parsedFilters = JSON.parse(filters)
      console.log('parsedFilters,', parsedFilters);

      if (parsedFilters?.length >= 1) {

        // Create a reducer to group your filters by type_name
        const filterGroups = parsedFilters.reduce((groups, score) => {
          if (!groups[score.type_name]) {
            groups[score.type_name] = {
              label: score.title,
              filterToggleButtonID: score.type_name + 'ToggleButton',
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
          params: groupedFilters, paramsLoaded: true
        };

      }
    }
  }
  catch (error) {
    console.error('Could not parse filters from URL', error)
  }

  return {params: [], paramsLoaded: false }
}

export const currentFilterState = atom({
  key: 'showCurrentFiltersState',
  default: getCurrentFilterFromUrl().params
});

const UseQueryFilters = () => {
  const { loading, error, data } = useQuery(QUERY_FILTERS);
  const [scoreFilters, setScoreFilters] = useState([]);
  const [numericFilters, setNumericFilters] = useState([]);
  const [genericFilters, setGenericFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useRecoilState(currentFilterState);

  useLayoutEffect(() => {
    let newScores = []
    let newCurrentFilters = []
    let newNumerics = []
    let newGenerics = []
    if(data) {
      console.log('data', data);
      let scores = data.filters.filter((item) => (item?.category === "Underflip\\Resorts\\Models\\Rating"));
      let numerics = data.filters.filter((item) => (item?.category === "Underflip\\Resorts\\Models\\Numeric"));
      let generics = data.filters.filter((item) => (item?.category === "Underflip\\Resorts\\Models\\Generic"));

      scores.map((score) => {
        const scoreObject = {
          label: score.title,
          filterToggleButtonID: score.name + 'ToggleButton',
          toggleOn: false,
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
        }

        currentFilter.forEach(current => {
          if(current.filterToggleButtonID === scoreObject.filterToggleButtonID) {
            scoreObject.toggleOn = current.toggleOn;
            scoreObject.filters = current.filters;
          }
        });

        newScores =  [...newScores, scoreObject];
      })

      numerics.map((numeric) => {
        const numericObject = {
          label: numeric.title,
          filterToggleButtonID: numeric.name + 'ToggleButton',
          toggleOn: false,
          filters: [{
            type_name: numeric.name,
            operator: '>',
            value: '0',
          },
            {
              type_name: numeric.name,
              operator: '<',
              value: '100',
            }],
        }

        currentFilter.forEach(current => {
          if(current.filterToggleButtonID === numericObject.filterToggleButtonID) {
            numericObject.toggleOn = current.toggleOn;
            numericObject.filters = current.filters;
          }
        });

        newNumerics =  [...newNumerics, numericObject];
      })

      generics.map((generic) => {
        const genericObject = {
          label: generic.title,
          filterToggleButtonID: generic.name + 'ToggleButton',
          toggleOn: false,
          filters: [{
            type_name: generic.name,
            operator: '=',
            value: true,
          }],
        }

        currentFilter.forEach(current => {
          if(current.filterToggleButtonID === genericObject.filterToggleButtonID) {
            genericObject.toggleOn = current.toggleOn;
            genericObject.filters = current.filters;
          }
        });

        newGenerics =  [...newGenerics, genericObject];
      })

      setScoreFilters(prevState => newScores);
      setNumericFilters(prevState => newNumerics);
      setGenericFilters(prevState => newGenerics);
      newCurrentFilters =  [...newScores, ...newNumerics, ...newGenerics];
      setCurrentFilter(prevState => newCurrentFilters);

    }
  }, [data]);


  return { loading, error, scoreFilters, numericFilters, genericFilters, currentFilter };
};

export default UseQueryFilters;
