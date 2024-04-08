import React, { useState } from 'react';
import { CImage } from '@coreui/react';
import { useRecoilState } from 'recoil';
import { currentFilterState } from '../../hooks/useQueryFilters';

const RegionSelect = () => {
  const [formData, setFormData] = useRecoilState(currentFilterState);
  const [region, setRegion] = useState(formData.locationType.continentId);

  const handleChange = (value) => {
    setRegion(value); // Assuming it sets the region in your application state
    setFormData({ groupedType: formData.groupedType, locationType: { continentId: value } });
  };

  return (
    <div className="region-select">
      <label htmlFor="worldwide">
        <input
          name="region"
          id="worldwide"
          type="radio"
          value="worldwide"
          checked={region === 'worldwide' || !region}
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
          value="asia"
          checked={region === 'asia'}
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
          value="northAmerica"
          checked={region === 'northAmerica'}
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
          value="southAmerica"
          checked={region === 'southAmerica'}
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
          value="europe"
          checked={region === 'europe'}
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
          value="oceania"
          checked={region === 'oceania'}
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
          value="africa"
          checked={region === 'africa'}
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
