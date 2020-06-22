import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

export const QUERY_HEALTH_CHECK = gql`
  {
    healthCheck
  }
`;

const Debug = () => {
  const { loading, error, data } = useQuery(QUERY_HEALTH_CHECK);

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

const Skeleton = () => {
  return <p>Loading...</p>;
};

export default Debug;
