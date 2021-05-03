import CIcon from '@coreui/icons-react';
import {
  CHeaderBrand,
  CHeaderNavLink,
  CImg, CNavLink,
  CSidebar,
  CSidebarMinimizer,
  CSidebarNav,
} from '@coreui/react';
import React, { useContext } from 'react';
import Logo from '../../../images/logo.svg';
import NavConfig from '../config/nav-config';
import ViewContext from '../ViewContext/ViewContext';

const SidebarNav = () => {
  const { showSidebar, setShowSidebar } = useContext(ViewContext);

  return (
    <CSidebar
      show={showSidebar}
      onShowChange={() => setShowSidebar(!showSidebar)}
    >
      <CSidebarNav className="sidebar-nav">
        <CHeaderBrand className="sidebar-nav__logo mx-auto d-lg-none">
          <CHeaderNavLink className="sidebar-nav__logo-link" to="/">
            <CImg src={Logo} className="sidebar-nav__logo-img" name="logo" height="28" alt="Logo" />
          </CHeaderNavLink>
        </CHeaderBrand>
        <SidebarNavItems />
      </CSidebarNav>
      <CSidebarMinimizer className="sidebar-nav__minimizer c-d-md-down-none" />
    </CSidebar>
  );
};

const SidebarNavItems = () => {
  const filtered = NavConfig.filter((item) => item.path !== '/');

  return filtered.map((item) => (
    <li key={item.path} className="sidebar-nav__item c-sidebar-nav-item">
      <CNavLink to={item.path} className="sidebar-nav__link c-sidebar-nav-link">
        <CIcon content={item.icon} className="sidebar-nav__icon mr-2" />
        {item.name}
      </CNavLink>
    </li>
  ));
};

export default SidebarNav;
