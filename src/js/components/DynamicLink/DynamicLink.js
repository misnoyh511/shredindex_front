import { useApolloClient } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import queryCMSPage from '../../utility/query-cms-page';

/**
 * A React Router Link that prefetches its path's data
 */
const DynamicLink = ({ to, className, children }) => {
  const client = useApolloClient();

  return (
    <Link
      to={to}
      className={className}
      onMouseOver={() => client.query(queryCMSPage(to))}
    >
      { children }
    </Link>
  );
};

DynamicLink.propTypes = {
  to: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export default DynamicLink;
