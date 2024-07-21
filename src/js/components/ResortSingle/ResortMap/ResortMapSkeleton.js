import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilMap } from '@coreui/icons';

const ResortMapLoadingState = () => (
  <div className="resort-map-loading skeleton">
    <div className="resort-map-loading__icon-wrapper">
      <CIcon
        icon={cilMap}
        size="5xl"
        className="resort-map-loading__icon"
      />
    </div>
  </div>
);

export default ResortMapLoadingState;
