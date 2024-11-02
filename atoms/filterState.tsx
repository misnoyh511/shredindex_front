import { atom } from 'recoil';
import { CurrentFilterState } from '../types/filterTypes';

// Get initial filter state
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

function getCurrentOrderByFromUrl() {
  if (typeof window === 'undefined') {
    return { params: [], paramsLoaded: false };
  }
  const params = new URLSearchParams(window.location.search);

  try {
    const orderBy = params.get('orderBy');
    if (orderBy) {
      const parsedOrderBy = JSON.parse(orderBy);

      return { params: parsedOrderBy, paramsLoaded: true };
    }
  } catch (error) { /* empty */ }

  return { params: [], paramsLoaded: false };
}

export const currentOrderByState = atom({
  key: 'showCurrentOrderByState',
  default: getCurrentOrderByFromUrl().params,
});
