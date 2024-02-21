import { useEffect, useState } from 'react';

/**
 * Reference a ranked resort filter toggleOn state from local storage
 *
 * @param {string} rankedResortFilterId
 * @return {[boolean, function]}
 */
const useRankedResortFiltersState = (name, operator, value) => {
  const storeFilterArray = (name, operator, value) => {
    // e.g "[{"typeName": "Snow Quality", "operator": "<", "value": "55"}]"
    const currentState = localStorage.getItem('rankedResortFilterState') || 'io';

    // Get the state without the current resort's id
    const newStateArray = currentState.filter((typeName) => typeName !== name);

    if (name, operator, value) {
      newStateArray.push({ name, operator, value });
    }

    localStorage.setItem('rankedResortFilterState', newStateArray);
  };

  useEffect(() => {
    storeFilterArray(name, operator, value);
  }, [name, operator, value]);

  return storeFilterArray;
};

export default useRankedResortFiltersState;
