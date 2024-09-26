import React from 'react';
import { CContainer } from '@coreui/react';
import RankedResortList from '../components/RankedResortList/RankedResortList';
import ResortsParallaxBackground from '../components/ResortsParallaxBackground/ResortsParallaxBackground';

const Resorts: React.FC = () => (
  <CContainer>
    <div className="resorts mt-4">
      <div className="ranked-resort-list row">
        <ResortsParallaxBackground />
        <RankedResortList cardLimit={5} />
      </div>
    </div>
  </CContainer>
);

export default Resorts;
