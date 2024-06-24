import React from 'react';
import { CContainer } from '@coreui/react';
import RankedResortList from '../RankedResortList/RankedResortList';
import ResortsParallaxBackground from '../ResortsParallaxBackground/ResortsParallaxBackground';

const Resorts = () => (
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
