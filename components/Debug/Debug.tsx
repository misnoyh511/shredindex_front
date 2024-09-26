import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const QUERY_HEALTH_CHECK = gql`
  {
    healthCheck
  }
`;

const Debug = () => {
  const { loading, error, data } = useQuery(QUERY_HEALTH_CHECK);

  const Skeleton = () => <p>Loading...</p>;

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    // Exit now
    return <p>An error occurred</p>;
  }

  const { healthCheck } = data;

  return healthCheck
    ? <p>Graphql server health check succeeded</p>
    : <p>Graphql server health check failed</p>;
};
export default Debug;
