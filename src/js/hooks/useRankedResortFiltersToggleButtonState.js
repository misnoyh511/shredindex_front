import { useEffect, useState } from 'react';

/**
 * Reference a ranked resort filter toggleOn state from local storage
 *
 * @param {string} rankedResortFilterId
 * @return {[boolean, function]}
 */
const useRankedResortFiltersToggleButtonState = (rankedResortFilterId) => {
  const storeToggleOn = (collapsed) => {
    const currentState = localStorage.getItem('rankedResortFilterToggleState') || 'io'; // e.g "io_1_2_3_4_5"
    // Get the state without the current resort's id
    const newStateArray = currentState.split('_').filter((id) => id !== rankedResortFilterId);

    if (collapsed) {
      newStateArray.push(rankedResortFilterId);
    }

    localStorage.setItem('rankedResortFilterToggleState', newStateArray.join('_'));
  };

  const storedAsToggleOn = () => {
    const currentState = localStorage.getItem('rankedResortFilterToggleState') || ''; // e.g "1_2_3_4_5"

    return currentState.split('_').some((id) => id === rankedResortFilterId);
  };

  const [toggleOn, setToggleOn] = useState(storedAsToggleOn());

  useEffect(() => {
    storeToggleOn(toggleOn);
  }, [toggleOn]);

  return [toggleOn, setToggleOn];
};

export default useRankedResortFiltersToggleButtonState;
