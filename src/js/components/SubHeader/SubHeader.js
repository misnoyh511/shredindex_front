import { CBreadcrumbRouter, CSubheader } from '@coreui/react';
import React from 'react';
import NavConfig from '../config/nav-config';

const SubHeader = () => (
  <CSubheader className="px-3 justify-content-between">
    <CBreadcrumbRouter
      className="border-0 c-subheader-nav m-0 px-0 px-md-3"
      routes={NavConfig}
    />
  </CSubheader>
);

export default SubHeader;
