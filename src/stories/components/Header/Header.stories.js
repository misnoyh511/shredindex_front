import { MockedProvider } from '@apollo/react-testing';
import React, { useMemo, useState } from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { IntlProvider } from 'react-intl';
import HeaderComponent from '../../../js/components/Header/Header';
import { menuCode as headerMenuCode } from '../../../js/components/HeaderMenuMain/HeaderMenuMain';
import SidebarNav from '../../../js/components/SidebarNav/SidebarNav';
import ViewContext from '../../../js/components/ViewContext/ViewContext';
import { QUERY_STATIC_MENU } from '../../../js/hooks/useStaticMenu';
import langEn from '../../../js/lang/en.json';

export default {
  title: 'Shred index/components/Header',
  component: HeaderComponent,
  decorators: [withRouter],
};

export const Header = () => {
  const mocks = {
    staticMenu: {
      request: {
        query: QUERY_STATIC_MENU,
        variables: {
          code: headerMenuCode,
        },
      },
      result: {
        data: {
          staticMenu: {
            menuItems: [
              {
                title: 'Foo',
                url: 'https://localhost/foo',
                items: [],
              },
              {
                title: 'Bar',
                url: 'https://localhost/bar',
                items: [],
              },
            ],
          },
        },
      },
    },
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const viewData = useMemo(() => ({ showSidebar, setShowSidebar }), [showSidebar]);

  return (
    <IntlProvider locale="en" message={langEn}>
      <ViewContext.Provider value={viewData}>
        <MockedProvider mocks={[mocks.staticMenu]} addTypename={false}>
          <>
            <SidebarNav />
            <HeaderComponent />
          </>
        </MockedProvider>
      </ViewContext.Provider>
    </IntlProvider>
  );
};
