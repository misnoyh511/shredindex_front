import { useState, useEffect, useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { gql, useQuery } from '@apollo/client';
import { CurrentFilterState, Type, FilterGroup } from '../types/filterTypes';

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

const LOCAL_STORAGE_KEY = 'currentFilterState';

function getFilterState(): CurrentFilterState {
  if (typeof window === 'undefined') {
    return { groupedType: [], locationType: {} };
  }

  const savedState = localStorage.getItem('currentFilterState');
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (error) {
      console.error('Error parsing filter state from localStorage:', error);
    }
  }

  const params = new URLSearchParams(window.location.search);
  const filtersParam = params.get('filters');

  if (filtersParam) {
    try {
      const parsedFilters = JSON.parse(filtersParam);
      return {
        groupedType: Array.isArray(parsedFilters) ? parsedFilters : parsedFilters.groupedType || [],
        locationType: parsedFilters.locationType || {},
      };
    } catch (error) {
      console.error('Error parsing filters from URL:', error);
    }
  }

  return { groupedType: [], locationType: {} };
}

export const currentFilterState = atom<CurrentFilterState>({
  key: 'showCurrentFiltersState',
  default: getFilterState(),
});

const useQueryTypes = () => {
  const { loading, error, data } = useQuery<{ types: Type[] }>(QUERY_TYPES);
  const [scoreFilters, setScoreFilters] = useState<FilterGroup[]>([]);
  const [numericFilters, setNumericFilters] = useState<FilterGroup[]>([]);
  const [genericFilters, setGenericFilters] = useState<FilterGroup[]>([]);
  const [currentFilter, setCurrentFilter] = useRecoilState(currentFilterState);
  const [initializedFromState, setInitializedFromState] = useState(false);

  const createFilterGroup = useCallback((item: Type, category: string, existingGroup?: FilterGroup): FilterGroup => {
    const baseGroup = {
      label: item.title,
      name: item.name,
      filterToggleButtonID: `${item.name}ToggleButton`,
      toggleOn: existingGroup?.toggleOn || false,
      unit: item.unit,
      max_value: item.max_value,
      filters: category === 'Generic'
        ? [{ type_name: item.name, operator: '=', value: existingGroup?.filters[0]?.value || 'no' }]
        : [
          { type_name: item.name, operator: '>', value: existingGroup?.filters[0]?.value || '0' },
          { type_name: item.name, operator: '<', value: existingGroup?.filters[1]?.value || (category === 'Numeric' ? (item.max_value?.toString() || '100') : '100') },
        ],
    };

    return existingGroup ? { ...baseGroup, toggleOn: existingGroup.toggleOn, filters: existingGroup.filters } : baseGroup;
  }, []);

  useEffect(() => {
    if (data && !initializedFromState) {
      const savedState = getFilterState();
      const scores = data.types.filter((item) => item?.category === 'Underflip\\Resorts\\Models\\Rating');
      const numerics = data.types.filter((item) => item?.category === 'Underflip\\Resorts\\Models\\Numeric');
      const generics = data.types.filter((item) => item?.category === 'Underflip\\Resorts\\Models\\Generic');

      const newScores = scores.map((item) => {
        const existingGroup = savedState.groupedType.find(g => g.filterToggleButtonID === `${item.name}ToggleButton`);
        return createFilterGroup(item, 'Score', existingGroup);
      });

      const newNumerics = numerics.map((item) => {
        const existingGroup = savedState.groupedType.find(g => g.filterToggleButtonID === `${item.name}ToggleButton`);
        return createFilterGroup(item, 'Numeric', existingGroup);
      });

      const newGenerics = generics.map((item) => {
        const existingGroup = savedState.groupedType.find(g => g.filterToggleButtonID === `${item.name}ToggleButton`);
        return createFilterGroup(item, 'Generic', existingGroup);
      });

      setScoreFilters(newScores);
      setNumericFilters(newNumerics);
      setGenericFilters(newGenerics);

      const newGroupedType = [...newScores, ...newNumerics, ...newGenerics];

      setCurrentFilter(prev => ({
        ...prev,
        groupedType: newGroupedType,
        locationType: savedState.locationType,
      }));

      setInitializedFromState(true);
    }
  }, [data, createFilterGroup, setCurrentFilter, initializedFromState]);

  useEffect(() => {
    if (typeof window !== 'undefined' && initializedFromState) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentFilter));

      const minimalState = {
        g: currentFilter.groupedType
          .filter(group => group.toggleOn)
          .map(group => ({
            id: group.filterToggleButtonID,
            f: group.filters.map(f => [f.type_name, f.operator, f.value])
          })),
        l: currentFilter.locationType
      };
      const params = new URLSearchParams(window.location.search);

      // Ensure the page number is being handled properly
      const page = params.get('page') || '1';
      params.set('f', JSON.stringify(minimalState));
      params.set('page', page);

      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    }
  }, [currentFilter, initializedFromState]);

  return {
    loading,
    error,
    scoreFilters,
    numericFilters,
    genericFilters,
    currentFilter,
  };
};

export default useQueryTypes;
