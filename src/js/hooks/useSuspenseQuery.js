import { useApolloClient } from '@apollo/client';
import { useMemo } from 'react';
import suspenseQuery from '../utility/suspense-query';

/**
 * A helpful hook suggested by https://isamatov.com/react-suspense-graphql-hooks/
 */
const useSuspenseQuery = (queries) => {
  const client = useApolloClient();

  return useMemo(() => suspenseQuery(client, queries), [queries]);
};

export default useSuspenseQuery;
