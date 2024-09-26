import { useEffect, useState } from 'react';

/**
 * Reference a boolean state stored in local storage for a specific component key and id
 *
 * @param {string} localStorageKey
 * @param {string} id
 * @return {[boolean, function]}
 */
const useLocalStorageDrivenBooleanState = (localStorageKey, id) => {
  const store = (bool) => {
    const currentState = localStorage.getItem(localStorageKey) || ''; // e.g "1_2_3_4_5"
    // Get the state without the current component's id
    const newStateArray = currentState.split('_').filter((n) => n !== id);

    if (bool) {
      newStateArray.push(id);
    }

    // Store updated state (and only store non-empty values)
    localStorage.setItem(localStorageKey, newStateArray.filter((n) => n).join('_'));
  };

  const isStored = () => {
    const currentState = localStorage.getItem(localStorageKey) || ''; // e.g "1_2_3_4_5"

    // Determine whether this component's id is present in the stored state
    return currentState.split('_').some((n) => n === id);
  };

  const [stored, setStored] = useState(isStored());

  useEffect(() => {
    store(stored);
  }, [stored]);

  return [stored, setStored];
};

export default useLocalStorageDrivenBooleanState;
