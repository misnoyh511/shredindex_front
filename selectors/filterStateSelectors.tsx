import { selector, useRecoilValue } from 'recoil';
import { currentFilterState, currentOrderByState } from '../atoms/filterState';
import {convertToLabel} from "../utils/helperFunctions";

// Selector to get active filter type names
export const activeFilterTypesSelector = selector({
  key: 'activeFilterTypesSelector',
  get: ({ get }) => {
    const currentFilter = get(currentFilterState);
    return currentFilter.groupedType
      .filter(group => group.toggleOn)
      .map(group => group.name);
  },
});

// Selector to get location filter names
export const locationFiltersSelector = selector({
  key: 'locationFiltersSelector',
  get: ({ get }) => {
    const currentFilter = get(currentFilterState);
    const locationType = currentFilter.locationType;

    // Return array of active location filters
    return Object.entries(locationType || {})
      .filter(([_, value]) => value) // Only include filters with values
      .map(([key]) => key); // Return the filter names
  },
});

// Selector to get current orderBy name
export const currentOrderByNameSelector = selector({
  key: 'currentOrderByNameSelector',
  get: ({ get }) => {
    const orderBy = get(currentOrderByState);
    return convertToLabel(orderBy?.type_name) || 'default'; // Replace 'default' with your default sort field
  },
});

// Helper hook to easily access all filter information unused.
export const useFilterInfo = () => {
  const activeFilterTypes = useRecoilValue(activeFilterTypesSelector);
  const locationFilters = useRecoilValue(locationFiltersSelector);
  const currentOrderByName = useRecoilValue(currentOrderByNameSelector);

  return {
    activeFilterTypes,
    locationFilters,
    currentOrderByName,
  };
};
