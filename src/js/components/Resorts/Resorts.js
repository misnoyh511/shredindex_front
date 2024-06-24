import React from 'react';
import RankedResortList from '../RankedResortList/RankedResortList';
import ResortsParallaxBackground from '../ResortsParallaxBackground/ResortsParallaxBackground';
import { CContainer } from '@coreui/react';

const Resorts = () => (
  <CContainer>
    <div className="resorts mt-4">
      <div className="ranked-resort-list row">
        <ResortsParallaxBackground/>
        <RankedResortList cardLimit={5}/>
      </div>
    </div>
  </CContainer>
);

export default Resorts;
