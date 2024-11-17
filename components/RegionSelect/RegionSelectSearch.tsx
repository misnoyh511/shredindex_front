import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentFilterState } from '../../atoms/filterState';
import { getContinent } from '../../hooks/getContinent';
import worldMap from '../../images/continents/continent-world-map-2d.svg';
import asia from '../../images/continents/continent-asia-map-2d.svg';
import oceania from '../../images/continents/continent-oceania-map-2d.svg';
import southAmerica from '../../images/continents/continent-south-america-map-2d.svg';
import northAmerica from '../../images/continents/continent-north-america-map-2d.svg';
import europe from '../../images/continents/continent-europe-map-2d.svg';
import africa from '../../images/continents/continent-africa-map-2d.svg';

const RegionSelectSearch = ({ onSelect }) => {
  const [formData] = useRecoilState(currentFilterState);
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (formData.locationType && formData.locationType.continentId) {
      setSelectedContinents(Array.isArray(formData.locationType.continentId)
        ? formData.locationType.continentId
        : [formData.locationType.continentId]);
    } else {
      setSelectedContinents([]);
    }
    setInitialLoading(false);
  }, [formData.locationType]);

  const handleChange = useCallback((value, label) => {
    if (value === 'worldwide') {
      // Call onSelect with the worldwide selection
      onSelect({
        value: 'worldwide',
        label: 'Worldwide',
      });
      return;
    }

    // For other continents, get the continent info and call onSelect
    const continentCode = getContinent(value).code;
    onSelect({
      value: continentCode,
      label: label,
    });
  }, [onSelect]);

  const isSelected = (value) => selectedContinents.includes(value);
  const isWorldwide = selectedContinents.length === 0 && !initialLoading;

  const renderCheckbox = (id, value, Image, label, loading) => {
    const continentId = value === 'worldwide' ? value : getContinent(value).continent_id;
    const checked = value === 'worldwide' ? isWorldwide : isSelected(continentId);

    return (
      <label htmlFor={id} key={id}>
        <input
          name="region"
          id={id}
          type="checkbox"
          value={value}
          checked={loading ? false : checked}
          onChange={() => handleChange(value, label)}
        />
        <div className={`region-item ${checked ? 'selected' : ''}`}>
          <div className="region-image-wrap">
            <Image
              className="region-image"
            />
          </div>
          <span>{label}</span>
        </div>
      </label>
    );
  };

  return (
    <div className="region-select">
      {initialLoading ? (
        renderCheckbox('worldwide', 'worldwide', worldMap, 'Worldwide', true)
      ) : (
        renderCheckbox('worldwide', 'worldwide', worldMap, 'Worldwide')
      )}
      {renderCheckbox('asia', 'AS', asia, 'Asia')}
      {renderCheckbox('northAmerica', 'NA', northAmerica, 'North America')}
      {renderCheckbox('southAmerica', 'SA', southAmerica, 'South America')}
      {renderCheckbox('europe', 'EU', europe, 'Europe')}
      {renderCheckbox('oceania', 'OC', oceania, 'Oceania')}
      {renderCheckbox('africa', 'AF', africa, 'Africa')}
    </div>
  );
};

export default RegionSelectSearch;
