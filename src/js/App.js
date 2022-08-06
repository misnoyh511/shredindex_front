import { CContainer } from '@coreui/react';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { Route } from 'react-router';
import DynamicSwitch from './components/DynamicSwitch/DynamicSwitch';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Resort from './components/Resort/Resort';
import Resorts from './components/Resorts/Resorts';
import SidebarNav from './components/SidebarNav/SidebarNav';
import SupportBanner from './components/SupportBanner/SupportBanner';
import ViewContext from './components/ViewContext/ViewContext';
import langEn from './lang/en.json';

const t = {
  en: langEn,
};

const locale = 'en';

const layouts = {
  home: Home,
  resorts: Resorts,
  resort: Resort,
};

const App = ({ suspenseQuery }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const viewData = useMemo(() => ({ showSidebar, setShowSidebar, layouts }), [showSidebar]);

  // Force suspense to wait until our suspense query is resolved
  suspenseQuery.read();

  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <IntlProvider locale={locale} message={t[locale]}>
          <div className="c-app c-default-layout">
            <ViewContext.Provider value={viewData}>
              <SidebarNav />
              <div className="wrapper d-flex flex-column min-vh-100">
                <Header />
                <div className="body flex-grow-1 px-3">
                  <main className="c-main">
                    <CContainer>
                      <DynamicSwitch />
                    </CContainer>
                  </main>
                </div>
                <SupportBanner />
                <Footer />
              </div>
            </ViewContext.Provider>
          </div>
        </IntlProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

App.propTypes = {
  suspenseQuery: PropTypes.shape({
    read: PropTypes.func,
  }).isRequired,
};

export default App;
