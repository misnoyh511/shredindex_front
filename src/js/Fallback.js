import { cilMenu } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CContainer, CHeader, CHeaderNav, CImage,
} from '@coreui/react';
import React from 'react';
import Logo from '../images/logo.svg';

const Fallback = () => (
  <div className="c-app c-default-layout">
    <div className="wrapper d-flex flex-column min-vh-100">
      <CHeader className="header mb-4">
        <CContainer fluid className="header__container-main">
          <div className="header__toggler header__toggler--placeholder header-toggler ps-1 d-md-none">
            <CIcon icon={cilMenu} size="lg" />
          </div>
          <div className="header__logo px-3 mx-auto mx-md-0">
            <CImage src={Logo} className="header__logo-image" name="logo" height="28" alt="Logo" />
          </div>
          <CHeaderNav className="header-nav d-none d-md-flex me-auto">
            <li className="nav-item header-nav__item header-nav__item--skeleton mx-3" />
          </CHeaderNav>
        </CContainer>
      </CHeader>
    </div>
  </div>
);

export default Fallback;
