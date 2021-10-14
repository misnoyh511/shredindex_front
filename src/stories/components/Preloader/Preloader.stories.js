import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import { IntlProvider } from 'react-intl';
import PreloaderComponent, { QUERY_HEALTH_CHECK } from '../../../js/components/Preloader/Preloader';
import langEn from '../../../js/lang/en.json';

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
      <IntlProvider locale="en" message={langEn}>
        <PreloaderComponent>
          <span className="foo-bar">&nbsp;</span>
        </PreloaderComponent>
      </IntlProvider>
    </MockedProvider>
  );
};
