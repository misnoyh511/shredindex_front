import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { IntlProvider } from 'react-intl';
import { withRouter } from 'storybook-addon-react-router-v6';
import HomeHero from '../../../js/components/HomeHero/HomeHero';
import langEn from '../../../js/lang/en.json';

export default {
  title: 'Shred index/components/HomeHero',
  component: HomeHero,
  decorators: [withRouter],
};

export const HeroStory = () => (
  <IntlProvider locale="en" messages={langEn}>
    <MockedProvider>
      <HomeHero />
    </MockedProvider>
  </IntlProvider>
);
