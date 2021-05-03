import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import PreloaderComponent, { QUERY_HEALTH_CHECK } from '../../../js/components/Preloader/Preloader';

export default {
  title: 'Shred index/components/Preloader',
  component: PreloaderComponent,
};

export const Preloader = () => {
  const mocks = {
    healthCheck: {
      request: {
        query: QUERY_HEALTH_CHECK,
      },
      result: {
        data: {
          healthCheck: true,
        },
      },
    },
  };

  return (
    <MockedProvider mocks={[mocks.healthCheck]} addTypename={false}>
      <PreloaderComponent>
        <span className="foo-bar">&nbsp;</span>
      </PreloaderComponent>
    </MockedProvider>
  );
};
