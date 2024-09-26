import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { IntlProvider } from 'react-intl';
import { withRouter } from 'storybook-addon-remix-react-router';
import NoUserAccess from '../../../../components/FeatureToggle/NoUserAccess';
import langEn from '../../../../lang/en.json';

export default {
  title: 'Shred index/components/NoUserAccess',
  component: NoUserAccess,
  decorators: [withRouter],
};

export const NoUserAccessStory = () => (
  <IntlProvider locale="en" messages={langEn}>
    <MockedProvider>
      <NoUserAccess />
    </MockedProvider>
  </IntlProvider>
);
