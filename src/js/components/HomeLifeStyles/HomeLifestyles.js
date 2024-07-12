import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import HomeRankedResortList from '../RankedResortList/HomeRankedResortList';
import HomeLifeStylesFilterButtons from '../RankedResortList/HomeLifeStylesFilterButtons';

const HomeLifeStyles = () => {
  const [selectedLifestyle, setSelectedLifestyle] = useState('Family');
  const handleSetLifeStyle = (lifestyle) => {
    setSelectedLifestyle(lifestyle);
  };

  return (
    <div className="home-lifestyles">
      <div className="home-lifestyles-title mb-4">
        <h4>
          <FormattedMessage
            id="shredindex.filter.LIFESTYLES"
            defaultMessage="Lifestyles"
          />
        </h4>
      </div>
      <div className="home-lifestyles-buttons mb-4">
        <HomeLifeStylesFilterButtons setLifeStyle={handleSetLifeStyle} />
      </div>
      <div className="home-lifestyles-cards">
        <HomeRankedResortList lifestyle={selectedLifestyle} cardLimit={5} />
      </div>
    </div>
  );
};

export default HomeLifeStyles;
