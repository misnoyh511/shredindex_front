import CIcon from '@coreui/icons-react';
import {
  CHeaderBrand,
  CHeaderNavLink,
  CImg,
  CNavLink,
  CSidebar,
  CSidebarMinimizer,
  CSidebarNav,
} from '@coreui/react';
import React, { useContext } from 'react';
import Logo from '../../../images/logo.svg';
import routingConfig from '../config/routing-config';
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
  const filtered = routingConfig.filter((item) => item.showInMenu);

  return filtered.map(({ path, icon, name }) => (
    <li key={path} className="sidebar-nav__item c-sidebar-nav-item">
      <CNavLink to={path} className="sidebar-nav__link c-sidebar-nav-link">
        <CIcon content={icon} className="sidebar-nav__icon mr-2" />
        {name}
      </CNavLink>
    </li>
  ));
};

export default SidebarNav;
