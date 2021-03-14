import { CImg } from '@coreui/react';
import React from 'react';
import SupportService from './SupportersService';

const TheSupporters = () => (
  <div className="support-banner p-0 h-auto">
    <div className="supporters w-100 p-4 align-items-center d-flex flex-wrap">
    {SupportService
      .map((item) => (
        <div className="m-auto p-3">
          <a href={item.path}>
            <CImg
              src={item.imgSrc}
              className="supporters-img opacity-3"
              alt={item.name}
            />
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default React.memo(TheSupporters);
