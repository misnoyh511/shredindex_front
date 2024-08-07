import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import DynamicSwitch from './components/DynamicSwitch/DynamicSwitch';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Resort from './pages/Resort/Resort';
import Resorts from './pages/Resorts/Resorts';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';
import SidebarNav from './components/SidebarNav/SidebarNav';
import SupportBanner from './components/SupportBanner/SupportBanner';
import ViewContext from './components/ViewContext/ViewContext';
import langEn from './lang/en.json';
import About from './pages/About/About';
import GlobalToast from './components/GlobalToast/GlobalToast';

const t = {
  en: langEn,
};

const locale = 'en';

const layouts = {
  home: Home,
  resorts: Resorts,
  resort: Resort,
  about: About,
  privacy: PrivacyPolicy,
  terms: TermsAndConditions,
};

const App = ({ suspenseQuery }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const viewData = useMemo(() => ({ showSidebar, setShowSidebar, layouts }), [showSidebar]);

  // Force suspense to wait until our suspense query is resolved
  suspenseQuery.read();

  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <IntlProvider locale={locale} messages={t[locale]}>
          <RecoilRoot>
            <div className="c-app c-default-layout">
              <ViewContext.Provider value={viewData}>
                <SidebarNav />
                <div className="wrapper d-flex flex-column min-vh-100">
                  <Header />
                  <div className="body flex-grow-1 min-vh-100">
                    <GlobalToast />
                    <main className="c-main">
                      <DynamicSwitch />
                    </main>
                  </div>
                  <SupportBanner />
                  <Footer />
                </div>
              </ViewContext.Provider>
            </div>
          </RecoilRoot>
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
