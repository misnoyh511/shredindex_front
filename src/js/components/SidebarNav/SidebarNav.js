import {
  CImage, CSidebar, CSidebarBrand, CSidebarNav,
} from '@coreui/react';
import React, { useContext } from 'react';
import Logo from '../../../images/logo.svg';
import DynamicLink from '../DynamicLink/DynamicLink';
import SidebarMenuMain from '../SidebarMenuMain/SidebarMenuMain';
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
          <DynamicLink className="sidebar-nav__logo-link" to="/">
            <CImage src={Logo} className="sidebar-nav__logo-img" name="logo" height="28" alt="Logo" />
          </DynamicLink>
        </CSidebarBrand>
        <SidebarMenuMain />
      </CSidebarNav>
    </CSidebar>
  );
};

export default SidebarNav;
