import React from 'react';
import { CContainer } from '@coreui/react';
import Hero from '../../components/Hero/Hero';
import HomeLifestyles from '../../components/HomeLifeStyles/HomeLifestyles';

const Home = () => (
  <div className="views__home">
    <Hero />
    <CContainer>
      <HomeLifestyles />
    </CContainer>
  </div>
);

export default Home;
