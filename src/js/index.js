import {
  gql, HttpLink, InMemoryCache, ApolloClient,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QUERY_CMS_PAGES } from './components/DynamicSwitch/DynamicSwitch';
import { QUERY_SETTINGS, QUERY_TEAM_MEMBERS } from './components/Footer/Footer';
import { menuCode as footerMenuCode } from './components/FooterMenuMain/FooterMenuMain';
import { menuCode as headerMenuCode } from './components/HeaderMenuMain/HeaderMenuMain';
import Fallback from './Fallback';
import { queryStaticMenu } from './hooks/useStaticMenu';
import useSuspenseQuery from './hooks/useSuspenseQuery';
import queryCMSPage from './utility/query-cms-page';
import '@fontsource/plus-jakarta-sans';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:8080/graphql',
  }),
});

// eslint-disable-next-line
const App = lazy(() => import('./App')); // Lazy load the bulk of the app

const Index = () => {
  // Load the critical application data simultaneously with the app.
  // This suspenseQuery will fetch the data and add it to Apollo's
  // memory cache, so that components can independently fetch
  // the data directly from the cache with minimal load times
  const suspenseQuery = useSuspenseQuery([
    // This is a good place to utilise our graphQL health check
    gql`
      {
        healthCheck
      }
    `,
    // Queries needed for first full render to the user
    queryCMSPage('/'),
    queryStaticMenu(headerMenuCode),
    queryStaticMenu(footerMenuCode),
    QUERY_CMS_PAGES,
    QUERY_SETTINGS,
    QUERY_TEAM_MEMBERS,
  ]);

  return (
    <Suspense fallback={<Fallback />}>
      <App suspenseQuery={suspenseQuery} />
    </Suspense>
  );
};

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ApolloProvider client={client}>
    <Index />
  </ApolloProvider>,
);
