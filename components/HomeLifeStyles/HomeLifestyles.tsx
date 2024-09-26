import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import HomeRankedResortList from '../RankedResortList/HomeRankedResortList';
import HomeLifeStylesFilterButtons from '../RankedResortList/HomeLifeStylesFilterButtons';

type Lifestyle = 'Family' | 'Beginner' | 'Advanced' | 'Powder' | 'Nightlife';

// Define a type for the props we want to pass to HomeRankedResortList
type HomeRankedResortListProps = {
  cardLimit: number;
  lifestyle: Lifestyle;
};

const HomeLifeStyles: React.FC = () => {
  const [selectedLifestyle, setSelectedLifestyle] = useState<Lifestyle>('Family');

  const handleSetLifeStyle = (lifestyle: Lifestyle) => {
    setSelectedLifestyle(lifestyle);
  };

  // Use a type assertion to tell TypeScript that HomeRankedResortList accepts these props
  const TypedHomeRankedResortList = HomeRankedResortList as React.ComponentType<HomeRankedResortListProps>;

  return (
    <div className="home-lifestyles mb-4">
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
        <TypedHomeRankedResortList
          cardLimit={3}
          lifestyle={selectedLifestyle}
        />
      </div>
    </div>
  );
};

export default HomeLifeStyles;
