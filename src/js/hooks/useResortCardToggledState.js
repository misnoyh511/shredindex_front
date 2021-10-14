import { useEffect, useState } from 'react';

/**
 * Reference a resort card's expanded state from local storage
 *
 * @param {string} resortId
 * @return {[boolean, function]}
 */
const useResortCardToggledState = (resortId) => {
  const storeExpanded = (collapsed) => {
    const currentState = localStorage.getItem('resortCollapsedState') || 'io'; // e.g "io_1_2_3_4_5"
    // Get the state without the current resort's id
    const newStateArray = currentState.split('_').filter((id) => id !== resortId);

    if (collapsed) {
      newStateArray.push(resortId);
    }

    localStorage.setItem('resortCollapsedState', newStateArray.join('_'));
  };

  const storedAsExpanded = () => {
    const currentState = localStorage.getItem('resortCollapsedState') || ''; // e.g "1_2_3_4_5"

    return currentState.split('_').some((id) => id === resortId);
  };

  const [expanded, setExpanded] = useState(storedAsExpanded());

  useEffect(() => {
    storeExpanded(expanded);
  }, [expanded]);

  return [expanded, setExpanded];
};

export default useResortCardToggledState;
