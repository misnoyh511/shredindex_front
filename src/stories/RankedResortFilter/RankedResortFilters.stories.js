import React from 'react';
import { IntlProvider } from 'react-intl';
import FiltersComponent from '../../js/components/RankedResortFilters/RankedResortFilters';
import langEn from '../../js/lang/en.json';

export default {
  title: 'Shred index/components/RankedResortFilter',
  component: FiltersComponent,
};

export const Filters = () => (
  <IntlProvider locale="en" message={langEn}>
    <FiltersComponent />
  </IntlProvider>
);
