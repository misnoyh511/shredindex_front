import React, { useState } from 'react';
import { CImage } from '@coreui/react';
import { useRecoilState } from 'recoil';
import { currentFilterState } from '../../hooks/useQueryTypes';
import getContinent from '../../hooks/getContinent';

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
              src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg?im_w=320"
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
              src="https://a0.muscache.com/im/pictures/d77de9f5-5318-4571-88c7-e97d2355d20a.jpg?im_w=320"
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
              src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg?im_w=320"
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
              src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg?im_w=320"
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
              src="https://cdn.midjourney.com/721fd559-c265-449c-814d-78439b9973c8/0_1.webp"
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
              src="https://a0.muscache.com/im/pictures/42a1fb0f-214c-41ec-b9d7-135fbbdb8316.jpg?im_w=320"
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
              src="https://a0.muscache.com/im/pictures/42a1fb0f-214c-41ec-b9d7-135fbbdb8316.jpg?im_w=320"
            />
          </div>
          <span>Africa</span>
        </div>
      </label>
    </div>
  );
};
export default RegionSelect;
