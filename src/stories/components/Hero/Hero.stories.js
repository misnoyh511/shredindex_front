import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { IntlProvider } from 'react-intl';
import { withRouter } from 'storybook-addon-react-router-v6';
import Hero from '../../../js/components/Hero/Hero';
import langEn from '../../../js/lang/en.json';

export default {
  title: 'Shred index/components/Hero',
  component: Hero,
  decorators: [withRouter],
};

export const HeroStory = () => (
  <IntlProvider locale="en" messages={langEn}>
    <MockedProvider>
      <Hero />
    </MockedProvider>
  </IntlProvider>
);
