import CIcon from '@coreui/icons-react';
import {
  CImage,
  CNavLink,
  CSidebar, CSidebarBrand,
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
      position="fixed"
      visible={showSidebar}
      onVisibleChange={(visible) => { setShowSidebar(visible); }}
    >
      <CSidebarNav className="sidebar-nav">
        <CSidebarBrand className="sidebar-nav__logo mx-auto d-lg-none">
          <CNavLink className="sidebar-nav__logo-link" href="/">
            <CImage src={Logo} className="sidebar-nav__logo-img" name="logo" height="28" alt="Logo" />
          </CNavLink>
        </CSidebarBrand>
        <SidebarNavItems />
      </CSidebarNav>
    </CSidebar>
  );
};

const SidebarNavItems = () => {
  const filtered = routingConfig.filter((item) => item.showInMenu);

  return filtered.map(({ path, icon, name }) => (
    <li key={path} className="sidebar-nav__item c-sidebar-nav-item">
      <CNavLink href={path} className="sidebar-nav__link c-sidebar-nav-link">
        <CIcon icon={icon} className="sidebar-nav__icon me-2" />
        {name}
      </CNavLink>
    </li>
  ));
};

export default SidebarNav;
