import {
  CHeaderBrand,
  CHeaderNavLink,
  CImg,
  CSidebar,
  CSidebarMinimizer,
  CSidebarNav,
} from '@coreui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../../../images/logo.svg';
import SidebarItems from './SidebarItems';

const SidebarNav = ({ toggle, setToggleNav }) => (
  <CSidebar
    show={toggle}
    onShowChange={() => setToggleNav(!toggle)}
  >
    <CSidebarNav>
      <CHeaderBrand className="mx-auto d-lg-none">
        <CHeaderNavLink to="/">
          <CImg src={Logo} name="logo" height="28" alt="Logo" />
        </CHeaderNavLink>
      </CHeaderBrand>
      <SidebarItems />
    </CSidebarNav>
    <CSidebarMinimizer className="c-d-md-down-none" />
  </CSidebar>
);

SidebarNav.propTypes = {
  toggle: PropTypes.string.isRequired,
  setToggleNav: PropTypes.func.isRequired,
};

export default SidebarNav;
