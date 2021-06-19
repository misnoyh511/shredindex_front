import React, { useState } from 'react';
import HeaderComponent from '../../../js/components/Header/Header';
import SidebarNav from '../../../js/components/SidebarNav/SidebarNav';
import ViewContext from '../../../js/components/ViewContext/ViewContext';

export default {
  title: 'Shred index/components/Header',
  component: HeaderComponent,
};

export const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ViewContext.Provider value={{ showSidebar, setShowSidebar }}>
      <SidebarNav />
      <HeaderComponent />
    </ViewContext.Provider>
  );
};
