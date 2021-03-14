import React from 'react';
import { CFooter, CImg } from '@coreui/react';
import Developers from './Developers';

const TheFooter = () => (
  <CFooter fixed={false} className="p-4 h-auto footers-banner">
    <div className="m-auto">
      <a className="mr-1" href="https://shredindex.com" target="_blank" rel="noopener noreferrer">ShredIndex</a>
      <span className="mr-1">&copy; 2020</span>
      <span className="mr-1">Developed by</span>
      <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">UnderFlip</a>
    </div>
    <div className="d-flex w-100 flex-wrap">
      <Developers />
    </div>
  </CFooter>
);

export default React.memo(TheFooter);
