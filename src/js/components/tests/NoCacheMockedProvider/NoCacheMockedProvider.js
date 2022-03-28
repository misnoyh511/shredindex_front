import { createMockClient } from 'mock-apollo-client';
import PropTypes from 'prop-types';
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

export const noCacheMockClient = () => createMockClient({
  defaultOptions: {
    watchQuery: { fetchPolicy: 'no-cache' },
    query: { fetchPolicy: 'no-cache' },
  },
});

const NoCacheMockedProvider = (props) => {
  const { children } = props;
  return (
    <MockedProvider
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}
      addTypename={false}
      {...props}
    >
      {children}
    </MockedProvider>
  );
};

NoCacheMockedProvider.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export default NoCacheMockedProvider;
