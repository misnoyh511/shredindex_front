import {
  CCol, CNav, CNavLink, CRow,
} from '@coreui/react';
import React from 'react';
import routingConfig from '../config/routing-config';

const FooterNav = () => (
  <CRow>
    <CCol xs="12">
      <div className="p-4 border-0">
        <CNav className="justify-content-center">
          <FooterNavList />
        </CNav>
      </div>
    </CCol>
  </CRow>
);

const FooterNavList = () => routingConfig.map((nav) => (
  <CNavLink key={nav.path} href={nav.path} className="text-light">
    {nav.name}
  </CNavLink>
));

export default FooterNav;
