import {
  CHeaderBrand, CHeaderNav, CHeaderNavLink, CImg,
} from '@coreui/react';
import React from 'react';
import Logo from '../../../images/logo.svg';
import HeaderItems from '../HeaderItems/HeaderItems';

const HeaderNavigation = () => (
  <>
    <CHeaderBrand className="px-3 d-md-down-none">
      <CHeaderNavLink to="/">
        <CImg src={Logo} name="logo" height="28" alt="Logo" />
      </CHeaderNavLink>
    </CHeaderBrand>
    <CHeaderBrand className="mx-auto d-lg-none">
      <CHeaderNavLink to="/">
        <CImg src={Logo} name="logo" height="28" alt="Logo" />
      </CHeaderNavLink>
    </CHeaderBrand>
    <CHeaderNav className="d-md-down-none mr-auto">
      <HeaderItems />
    </CHeaderNav>
  </>
);

export default HeaderNavigation;
