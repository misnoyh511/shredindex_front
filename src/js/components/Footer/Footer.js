import React from 'react';
import { CFooter } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import UnderflipTeam from '../UnderflipTeam/UnderflipTeam';
import ProductOverview from '../config/product-overview-config';

const Footer = () => {
  const { shredIndex } = ProductOverview;
  return (
    <CFooter fixed={false} className="p-4 h-auto footers-banner ">
      <div className="m-auto">
        <a className="mr-1" href={shredIndex.url} target="_blank" rel="noreferrer">
          <FormattedMessage
            id="shredindex.app.PRODUCT"
            defaultMessage="ShredIndex"
          />
        </a>
        <span className="mr-1">
          &copy;
          {new Date().getFullYear()}
        </span>
        <span className="mr-1">
          <FormattedMessage
            id="shredindex.app.FOOTER"
            defaultMessage="Developed by"
          />
        </span>
        <span className="text-primary">
          <FormattedMessage
            id="shredindex.app.COMPANY"
            defaultMessage="Underflip"
          />
        </span>
      </div>
      <div className="team-members-banner d-flex w-100 flex-wrap">
        <UnderflipTeam />
      </div>
    </CFooter>
  );
};

export default Footer;
