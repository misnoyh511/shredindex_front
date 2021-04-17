import React from 'react';
import { CImg } from '@coreui/react';
import SupportItems from '../config/supporter-config';

const SupportBanner = () => (
  <div className="support-banner p-0 h-auto">
    <div className="supporters container w-100 p-4 align-items-center d-flex flex-wrap">
      <Supporters />
    </div>
  </div>
);

export const Supporters = () => SupportItems.map((support) => (
  <div className="m-auto p-3" key={support.name}>
    <a href={support.url} rel="noopener noreferrer">
      <CImg
        src={support.imgSrc}
        className="supporters-img opacity-3"
        alt={support.name}
      />
    </a>
  </div>
));

export default SupportBanner;
