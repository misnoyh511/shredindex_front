import { gql, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { QUERY_SETTINGS, QUERY_TEAM_MEMBERS } from './components/Footer/Footer';
import Fallback from './Fallback';
import useSuspenseQuery from './hooks/useSuspenseQuery';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.GRAPHQL_URI,
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
    QUERY_SETTINGS,
    QUERY_TEAM_MEMBERS,
  ]);

  return (
    <Suspense fallback={<Fallback />}>
      <App suspenseQuery={suspenseQuery} />
    </Suspense>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Index />
  </ApolloProvider>,
  document.getElementById('app'),
);
