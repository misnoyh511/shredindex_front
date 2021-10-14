import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import HeaderComponent from '../../../js/components/Header/Header';
import SidebarNav from '../../../js/components/SidebarNav/SidebarNav';
import ViewContext from '../../../js/components/ViewContext/ViewContext';
import langEn from '../../../js/lang/en.json';

export default {
  title: 'Shred index/components/Header',
  component: HeaderComponent,
};

export const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <IntlProvider locale="en" message={langEn}>
      <ViewContext.Provider value={{ showSidebar, setShowSidebar }}>
        <SidebarNav />
        <HeaderComponent />
      </ViewContext.Provider>
    </IntlProvider>
  );
};
