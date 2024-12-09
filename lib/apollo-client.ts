import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let apolloClient: ApolloClient<unknown> | undefined;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // Your GraphQL endpoint
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: unknown) {
  // @ts-expect-error yes
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
