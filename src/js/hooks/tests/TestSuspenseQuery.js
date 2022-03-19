import PropTypes from 'prop-types';
import React from 'react';
import useSuspenseQuery from '../useSuspenseQuery';

/**
 * A functional component with the useSuspenseQuery hook
 * for use in jest/enzyme tests
 */
const TestSuspenseQuery = ({ queries, callback }) => {
  const query = useSuspenseQuery(queries);

  // Pass back the query
  if (callback) {
    callback(query);
  }

  return <div>This is a debugging component</div>;
};

TestSuspenseQuery.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  queries: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  callback: PropTypes.func,
};

export default TestSuspenseQuery;
