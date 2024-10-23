import React, { useEffect, useState } from 'react';
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
import { useApollo } from '../lib/apollo-client';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../src/scss/style.scss';

// Dynamic imports with SSR disabled for interactive components
const GlobalToast = dynamic(() => import('../components/GlobalToast/GlobalToast'), {
  ssr: false,
});
const Login = dynamic(() => import('@/Login/Login'), {
  ssr: false,
});
const MembershipModal = dynamic(() => import('@/MembershipModal/MembershipModal'), {
  ssr: false,
});

const t = {
  en: langEn,
};

const locale = 'en';

export const layouts = {
  resorts: dynamic(() => import('./resorts'), { ssr: true }),
  resort: dynamic(() => import('@/ResortSingle/ResortSingle'), { ssr: true }),
  about: dynamic(() => import('./about'), { ssr: true }),
  privacy: dynamic(() => import('./privacy-policy'), { ssr: true }),
  terms: dynamic(() => import('./terms-and-conditions'), { ssr: true }),
  home: dynamic(() => import('./../components/Home/home'), { ssr: true }),
};

const InitializeRecoilState = () => {
  const setLayouts = useSetRecoilState(layoutsAtom);

  useEffect(() => {
    setLayouts(layouts);
  }, [setLayouts]);

  return null;
};

// Client-side only wrapper for interactive components
const ClientOnlyPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <GlobalToast />
      <Login />
      <MembershipModal />
      {children}
    </>
  );
};

const AppContent = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="c-app c-default-layout">
      {mounted && <SidebarNav />}
      <div className="wrapper d-flex flex-column min-vh-100">
        <Header />
        <div className="body flex-grow-1 min-vh-100">
          <ClientOnlyPortal>
            <main className="c-main">
              <Component {...pageProps} />
            </main>
          </ClientOnlyPortal>
        </div>
        <SupportBanner />
        <Footer />
      </div>
    </div>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <IntlProvider locale={locale} messages={t[locale]}>
        <RecoilRoot>
          <InitializeRecoilState />
          <AppContent Component={Component} pageProps={pageProps} />
        </RecoilRoot>
      </IntlProvider>
    </ApolloProvider>
  );
};

export default MyApp;
