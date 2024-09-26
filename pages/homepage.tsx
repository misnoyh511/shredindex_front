import React from 'react';
import { CContainer } from '@coreui/react';
import HomeHero from '../components/HomeHero/HomeHero';
import HomeCTA from '../components/HomeCTA/HomeCTA';
import HomeLifestyles from '../components/HomeLifeStyles/HomeLifestyles';
import HomeProMember from '../components/HomeProMember/HomeProMember';
import HomeAppFeatures from '../components/HomeAppFeatures/HomeAppFeatures';
import HomeAdvancedFilters from '../components/HomeAdvancedFilters/HomeAdvancedFilters';

const Homepage: React.FC = () => (
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
);

export default Homepage;
