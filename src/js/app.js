import { ApolloProvider } from '@apollo/react-hooks';
import { CContainer } from '@coreui/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import FooterNav from './components/FooterNav/FooterNav';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Preloader from './components/Preloader/Preloader';
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

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.GRAPHQL_URI,
});

const client = new ApolloClient({
  cache,
  link,
});

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Preloader>
          <IntlProvider locale={locale} message={t[locale]}>
            <div className="c-app c-default-layout">
              <ViewContext.Provider value={{ showSidebar, setShowSidebar }}>
                <SidebarNav />
                <div className="wrapper d-flex flex-column min-vh-100">
                  <Header />
                  <div className="body flex-grow-1 px-3">
                    <main className="c-main">
                      <CContainer>
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/resorts/:urlSegment" component={Resort} />
                          <Route exact path="/resorts" component={Resorts} />
                        </Switch>
                      </CContainer>
                    </main>
                  </div>
                  <SupportBanner />
                  <Footer />
                  <FooterNav />
                </div>
              </ViewContext.Provider>
            </div>
          </IntlProvider>
        </Preloader>
      </ApolloProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
