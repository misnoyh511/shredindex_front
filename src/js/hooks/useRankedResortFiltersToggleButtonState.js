import { useEffect, useState } from 'react';

const useRankedResortFiltersToggleButtonState = (toggleID, onChange) => {
  const storeToggleOn = (collapsed) => {
    const currentState = localStorage.getItem('rankedResortFilterToggleState') || 'io';
    const newStateArray = currentState.split('_').filter((id) => id !== toggleID);

    if (collapsed) {
      newStateArray.push(toggleID);
    }

    localStorage.setItem('rankedResortFilterToggleState', newStateArray.join('_'));
  };

  const storeInputData = (data) => {
    const currentData = JSON.parse(localStorage.getItem('rankedResortFilterDataState') || '{}');
    if (!currentData.hasOwnProperty(toggleID)) {
      currentData[toggleID] = { toggleID, filters: [] };
    }
    currentData[toggleID].filters.push(data);
    localStorage.setItem('rankedResortFilterDataState', JSON.stringify(currentData));
  };

  const storedAsToggleOn = () => {
    const currentState = localStorage.getItem('rankedResortFilterToggleState') || '';
    return currentState.split('_').some((id) => id === toggleID);
  };

  const storedInputData = () => {
    const currentData = JSON.parse(localStorage.getItem('rankedResortFilterDataState') || '{}');
    return currentData.hasOwnProperty(toggleID) ? currentData[toggleID].filters : [];
  };

  const [toggleOn, setToggleOn] = useState(storedAsToggleOn());
  const [inputData, setInputData] = useState(storedInputData());

  useEffect(() => {
    storeToggleOn(toggleOn);
  }, [toggleOn]);

  useEffect(() => {
    if (onChange) {
      onChange(inputData);
    }
  }, [inputData]);

  const setInput = (data) => {
    setInputData((prev) => [...prev, data]);
    storeInputData(data);
  };

  return [toggleOn, setToggleOn, inputData, setInput];
};

export default useRankedResortFiltersToggleButtonState;
