import React from 'react';
import { useRecoilState } from 'recoil';
import {
  CSidebar,
  CSidebarNav,
} from '@coreui/react';
import Logo from '../../images/logo.svg';
import CustomSidebarBrand from '../CustomSidebarBrand/CustomSidebarBrand';
import SidebarMenuMain from '../SidebarMenuMain/SidebarMenuMain';
import { showSidebar as showSidebarState } from '../../atoms/showSidebar';

const SidebarNav: React.FC = () => {
  const [showSidebar, setShowSidebar] = useRecoilState(showSidebarState);

  return (
    <CSidebar
      position="fixed"
      visible={showSidebar}
      onVisibleChange={(visible) => { setShowSidebar(visible); }}
    >
      <CSidebarNav className="sidebar-nav">
        <CustomSidebarBrand
          to="/"
          className="sidebar-nav__logo mx-auto d-lg-none"
        >
          <Logo
            className="sidebar-nav__logo-img"
            name="logo"
            height={28}
            alt="Logo"
          />
        </CustomSidebarBrand>
        <SidebarMenuMain />
      </CSidebarNav>
    </CSidebar>
  );
};

export default SidebarNav;
