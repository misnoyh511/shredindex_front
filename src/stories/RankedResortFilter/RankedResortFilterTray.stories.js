import React from 'react';
import { RecoilRoot } from 'recoil';
import { IntlProvider } from 'react-intl';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import FilterMenuComponent from '../../../components/RankedResortFilterMenu/RankedResortFilterMenu';
import langEn from '../../../lang/en.json';

export default {
  title: 'Shred index/components/RankedResortFilter',
  component: FilterMenuComponent,
};

export const FilterTray = () => (
  <MemoryRouter initialEntries={['?first=2', '?page=1']}>
    <IntlProvider locale="en" message={langEn}>
      <RecoilRoot>
        <MockedProvider>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <FilterMenuComponent />
          </QueryParamProvider>
        </MockedProvider>
      </RecoilRoot>
    </IntlProvider>
  </MemoryRouter>
);
