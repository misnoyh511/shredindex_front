import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';

export const QUERY_HEALTH_CHECK = gql`
  {
    healthCheck
  }
`;

const Preloader = ({ children }) => {
  const { loading } = useQuery(QUERY_HEALTH_CHECK);

  if (loading) {
    return (
      <div className="preloader d-flex min-vh-100 justify-content-center align-items-center">
        <div className="preloader__content">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      { children }
    </div>
  );
};

Preloader.propTypes = {
  children: PropTypes.node,
};

Preloader.defaultProps = {
  children: null,
};

export default Preloader;
