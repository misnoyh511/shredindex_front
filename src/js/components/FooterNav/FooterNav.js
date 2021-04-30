import React from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CNav,
  CNavLink,
} from '@coreui/react';
import NavConfig from '../config/nav-config';

const FooterNav = () => (
  <CRow>
    <CCol xs="12">
      <CCard className="bg-gradient-dark m-0 border-0">
        <CCardBody>
          <CNav className="justify-content-center">
            <FooterNavList />
          </CNav>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
);

const FooterNavList = () => NavConfig.map((nav) => (
  <CNavLink key={nav.path} to={nav.path} className="text-light">
    {nav.name}
  </CNavLink>
));

export default FooterNav;
