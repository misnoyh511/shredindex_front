import React, { useState } from 'react';
import { CImage } from '@coreui/react';
import { useRecoilState } from 'recoil';
import { currentFilterState } from '../../hooks/useQueryTypes';
import getContinent from '../../hooks/getContinent';
import worldMap from '../../../images/continent-world-map-2d.svg';
import asia from '../../../images/continent-asia-map-2d.svg';
import oceania from '../../../images/continent-oceania-map-2d.svg';
import southAmerica from '../../../images/continent-south-america-map-2d.svg';
import northAmerica from '../../../images/continent-north-america-map-2d.svg';
import europe from '../../../images/continent-europe-map-2d.svg';
import africa from '../../../images/continent-africa-map-2d.svg';

const RegionSelect = () => {
  const [formData, setFormData] = useRecoilState(currentFilterState);
  const [region, setRegion] = useState(formData.locationType.continentId);

  const handleChange = (value) => {
    const selectedContinent = getContinent(value);

    if (value === 'worldwide') {
      setRegion(null);
      setFormData({ groupedType: formData.groupedType, locationType: {} });
    } else {
      setRegion(selectedContinent.continent_id);
      setFormData({
        groupedType: formData.groupedType,
        locationType:
          { continentId: selectedContinent.continent_id },
      });
    }
  };

  return (
    <div className="region-select">
      <label htmlFor="worldwide">
        <input
          name="region"
          id="worldwide"
          type="radio"
          value="worldwide"
          checked={!region}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="region-item">
          <div className="region-image-wrap">
            <CImage
              className="region-image"
              src={worldMap}
            />
          </div>
          <span>Worldwide</span>
        </div>
      </label>
      <label htmlFor="asia">
        <input
          name="region"
          id="asia"
          type="radio"
          value="AS"
          checked={region === getContinent('AS').continent_id}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="region-item">
          <div className="region-image-wrap">
            <CImage
              className="region-image"
              src={asia}
            />
          </div>
          <span>Asia</span>
        </div>
      </label>
      <label htmlFor="northAmerica">
        <input
          name="region"
          id="northAmerica"
          type="radio"
          value="NA"
          checked={region === getContinent('NA').continent_id}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="region-item">
          <div className="region-image-wrap">
            <CImage
              className="region-image"
              src={northAmerica}
            />
          </div>
          <span>North America</span>
        </div>
      </label>
      <label htmlFor="southAmerica">
        <input
          name="region"
          id="southAmerica"
          type="radio"
          value="SA"
          checked={region === getContinent('SA').continent_id}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="region-item">
          <div className="region-image-wrap">
            <CImage
              className="region-image"
              src={southAmerica}
            />
          </div>
          <span>South America</span>
        </div>
      </label>
      <label htmlFor="europe">
        <input
          name="region"
          id="europe"
          type="radio"
          value="EU"
          checked={region === getContinent('EU').continent_id}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="region-item">
          <div className="region-image-wrap">
            <CImage
              className="region-image"
              src={europe}
            />
          </div>
          <span>Europe</span>
        </div>
      </label>
      <label htmlFor="oceania">
        <input
          name="region"
          id="oceania"
          type="radio"
          value="OC"
          checked={region === getContinent('OC').continent_id}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="region-item">
          <div className="region-image-wrap">
            <CImage
              className="region-image"
              src={oceania}
            />
          </div>
          <span>Oceania</span>
        </div>
      </label>
      <label htmlFor="africa">
        <input
          name="region"
          id="africa"
          type="radio"
          value="AF"
          checked={region === getContinent('AF').continent_id}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="region-item">
          <div className="region-image-wrap">
            <CImage
              className="region-image"
              src={africa}
            />
          </div>
          <span>Africa</span>
        </div>
      </label>
    </div>
  );
};
export default RegionSelect;
