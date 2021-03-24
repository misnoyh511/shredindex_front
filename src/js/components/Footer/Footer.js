import React from 'react';
import { CFooter, CImg } from '@coreui/react';
import UnderflipTeam from '../UnderflipTeam/UnderflipTeam';
import ProductOverview from '../config/product-overview-config';

const Footer = () => (
  <CFooter fixed={false} className="p-4 h-auto footers-banner ">
    <div className="m-auto">
      <a className="mr-1" href={ProductOverview.shredIndex.url} target="_blank" rel="noopener">{ProductOverview.shredIndex.name}</a>
      <span className="mr-1">
        &copy;
        {new Date().getFullYear()}
      </span>
      <span className="mr-1">Developed by</span>
      <a href={ProductOverview.underFlip.url} target="_blank" rel="noopener ">{ProductOverview.underFlip.name}</a>
    </div>
    <div className="d-flex w-100 flex-wrap">
      <UnderflipTeam />
    </div>
  </CFooter>
);

export default Footer;
