import React from 'react';
import { CFooter, CImg } from '@coreui/react';
import UnderflipTeam from '../UnderflipTeam/UnderflipTeam';
import ProductOverview from '../config/product-overview-config';

const Footer = () => {
  const { shredIndex, underflip } = ProductOverview;
  return (
    <CFooter fixed={false} className="p-4 h-auto footers-banner ">
      <div className="m-auto">
        <a className="mr-1" href={shredIndex.url} target="_blank" rel="noopener">{shredIndex.name}</a>
        <span className="mr-1">
          &copy;
          {new Date().getFullYear()}
        </span>
        <span className="mr-1">Developed by</span>
        <a href={underflip.url} target="_blank" rel="noopener ">{underflip.name}</a>
      </div>
      <div className="team-members-banner d-flex w-100 flex-wrap">
        <UnderflipTeam />
      </div>
    </CFooter>
  );
};

export default Footer;
