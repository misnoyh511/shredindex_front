import React from 'react';
import { CImg } from '@coreui/react';
import SupportService from '../config/supporter-config';

const SupportBanner = () => (
  <div className="support-banner p-0 h-auto">
    <div className="supporters container w-100 p-4 align-items-center d-flex flex-wrap">
      <SupportItems />
    </div>
  </div>
);

export const SupportItems = () => SupportService
  .map((item) => (
    <div className="m-auto p-3" key={item.name}>
      <a href={item.url} rel="noopener noreferrer">
        <CImg
          src={item.imgSrc}
          className="supporters-img opacity-3"
          alt={item.name}
        />
      </a>
    </div>
  ));

export default SupportBanner;
