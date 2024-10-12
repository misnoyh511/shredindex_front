import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { IntlProvider } from 'react-intl';
import dynamic from 'next/dynamic';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import SidebarNav from '../components/SidebarNav/SidebarNav';
import SupportBanner from '../components/SupportBanner/SupportBanner';
import { layoutsAtom } from '../atoms/layoutsType';
import langEn from '../lang/en.json';
import GlobalToast from '../components/GlobalToast/GlobalToast';
import { useApollo } from '../lib/apollo-client';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../src/scss/style.scss';
import Login from '@/Login/Login';

const t = {
  en: langEn,
};

const locale = 'en';

export const layouts = {
  resorts: dynamic(() => import('./resorts')),
  resort: dynamic(() => import('@/ResortSingle/ResortSingle')),
  about: dynamic(() => import('./about')),
  privacy: dynamic(() => import('./privacy-policy')),
  terms: dynamic(() => import('./terms-and-conditions')),
  home: dynamic(() => import('./../components/Home/home')),
};

const InitializeRecoilState = () => {
  const setLayouts = useSetRecoilState(layoutsAtom);

  React.useEffect(() => {
    setLayouts(layouts);
  }, [setLayouts]);

  return null;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <IntlProvider locale={locale} messages={t[locale]}>
        <RecoilRoot>
          <InitializeRecoilState />
          <div className="c-app c-default-layout">
            <SidebarNav />
            <div className="wrapper d-flex flex-column min-vh-100">
              <Header />
              <div className="body flex-grow-1 min-vh-100">
                <GlobalToast />
                <Login />
                <main className="c-main">
                  <Component {...pageProps} />
                </main>
              </div>
              <SupportBanner />
              <Footer />
            </div>
          </div>
        </RecoilRoot>
      </IntlProvider>
    </ApolloProvider>
  );
};

export default MyApp;
