import React from 'react';
import { useRecoilState } from 'recoil';
import {
  CSidebar, CSidebarBrand, CSidebarNav,
} from '@coreui/react';
import Logo from '../../images/logo.svg';
import DynamicLink from '../DynamicLink/DynamicLink';
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
        <CSidebarBrand className="sidebar-nav__logo mx-auto d-lg-none">
          <DynamicLink className="sidebar-nav__logo-link" to="/">
            <Logo className="sidebar-nav__logo-img" name="logo" height={28} alt="Logo" />
          </DynamicLink>
        </CSidebarBrand>
        <SidebarMenuMain />
      </CSidebarNav>
    </CSidebar>
  );
};

export default SidebarNav;
