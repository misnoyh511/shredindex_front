import React from 'react';
import { CContainer } from '@coreui/react';
import { HomeMetaTags } from '@/MetaTags/HomeMetaTags';
import HomeHero from '../HomeHero/HomeHero';
import HomeCTA from '../HomeCTA/HomeCTA';
import HomeLifestyles from '../HomeLifeStyles/HomeLifestyles';
import HomeProMember from '../HomeProMember/HomeProMember';
import HomeAppFeatures from '../HomeAppFeatures/HomeAppFeatures';
import HomeAdvancedFilters from '../HomeAdvancedFilters/HomeAdvancedFilters';
import { useRecoilValue } from 'recoil';
import { currentOrderByState } from '../../atoms/filterState';

const Home: React.FC = () => {
  // Get the current lifestyle from Recoil state
  const orderBy = useRecoilValue(currentOrderByState);

  // Map the order by type to lifestyle label
  const getCurrentLifestyle = () => {
    switch (orderBy?.type_name) {
      case 'family_friendly':
        return 'Family';
      case 'shops':
        return 'Luxury';
      case 'expert_terrain_score':
        return 'Extreme';
      case 'average_annual_snowfall':
        return 'Powder';
      case 'helicopter':
        return 'Helicopter';
      case 'affordability':
        return 'Affordable';
      default:
        return 'Family'; // Default lifestyle
    }
  };

  return (
    <>
      <HomeMetaTags currentLifestyle={getCurrentLifestyle()} />
      <div className="views__home">
        <HomeHero />
        <CContainer>
          <HomeLifestyles />
          <HomeCTA />
        </CContainer>
        <HomeProMember />
        <HomeAppFeatures />
        <HomeAdvancedFilters />
      </div>
    </>
  );
};

export default Home;
