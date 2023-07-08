import React from 'react';
import { RecoilRoot } from 'recoil';
import { IntlProvider } from 'react-intl';
import FilterMenuComponent from '../../js/components/RankedResortFilterMenu/RankedResortFilterMenu';
import langEn from '../../js/lang/en.json';

export default {
  title: 'Shred index/components/RankedResortFilter',
  component: FilterMenuComponent,
};

export const FilterTray = () => (
  <IntlProvider locale="en" message={langEn}>
    <RecoilRoot>
      <FilterMenuComponent />
    </RecoilRoot>
  </IntlProvider>
);
