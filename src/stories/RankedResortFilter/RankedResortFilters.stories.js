import React from 'react';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import { IntlProvider } from 'react-intl';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import langEn from '../../../lang/en.json';
import { QUERY_TYPES } from '../../../hooks/useQueryTypes';
import FiltersComponent from '../../../components/RankedResortFilters/RankedResortFilters';

export default {
  title: 'Shred index/components/RankedResortFilter',
  component: FiltersComponent,
};

const mocks = [
  {
    request: {
      query: QUERY_TYPES,
    },
    result: {
      data: {
        types: [
          {
            name: 'Snowfall',
            title: 'Average Annual Snowfall',
            category: 'Underflip\\Resorts\\Models\\Rating',
            unit_id: 'inches',
            max_value: 500,
          },
          {
            name: 'Runs',
            title: 'Number of Runs',
            category: 'Underflip\\Resorts\\Models\\Numeric',
            unit_id: 'runs',
            max_value: 150,
          },
          {
            name: 'Elevation',
            title: 'Base Elevation',
            category: 'Underflip\\Resorts\\Models\\Numeric',
            unit_id: 'feet',
            max_value: 10000,
          },
          {
            name: 'Night Skiing',
            title: 'Night Skiing Available',
            category: 'Underflip\\Resorts\\Models\\Generic',
            unit_id: 'yes/no',
            max_value: null,
          },
        ],
      },
    },
  },
];

export const Filters = () => (
  <MemoryRouter>
    <IntlProvider locale="en" messages={langEn}>
      <RecoilRoot>
        <MockedProvider mocks={mocks} addTypename={false}>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <FiltersComponent />
          </QueryParamProvider>
        </MockedProvider>
      </RecoilRoot>
    </IntlProvider>
  </MemoryRouter>
);
