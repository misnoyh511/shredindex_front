import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import ResortSearchAutoSuggest, { SEARCH_RESORTS } from '../../../js/components/ResortSearchAutoSuggest/ResortSearchAutoSuggest';
import ResortSearchAutoSuggestSkeleton from '../../../js/components/ResortSearchAutoSuggest/ResortSearchAutoSuggestSkeleton';
import langEn from '../../../js/lang/en.json';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default {
  title: 'Shred index/components/Search',
  component: ResortSearchAutoSuggest,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={['/']}>
          <IntlProvider locale="en" messages={langEn}>
            <Routes>
              <Route
                exact
                path="/"
                element={(
                  <Story />
                )}
              />
            </Routes>
          </IntlProvider>
        </MemoryRouter>
      </ApolloProvider>
    ),
  ],
};

const Template = (args) => <ResortSearchAutoSuggest {...args} />;
const SkeletonTemplate = (args) => <ResortSearchAutoSuggestSkeleton {...args} />;

export const Default = Template.bind({});
Default.args = { searchTerm: '' };

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {};

export const Loading = Template.bind({});
Loading.args = { searchTerm: 'loading' };
Loading.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: SEARCH_RESORTS,
          variables: { query: 'loading', perPage: 400 },
        },
        result: {
          loading: true,
        },
      },
    ],
  },
};

export const WithResults = Template.bind({});
WithResults.args = { searchTerm: 'test' };
WithResults.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: SEARCH_RESORTS,
          variables: { query: 'test', perPage: 400 },
        },
        result: {
          data: {
            searchResorts: {
              data: [
                {
                  id: '1',
                  title: 'Test Resort',
                  url_segment: 'test-resort',
                  location: {
                    city: 'Test City',
                    state: { name: 'Test State' },
                    country: { name: 'Test Country' },
                  },
                },
                {
                  id: '2',
                  title: 'Another Test Resort',
                  url_segment: 'another-test-resort',
                  location: {
                    city: 'Another City',
                    state: { name: 'Another State' },
                    country: { name: 'Another Country' },
                  },
                },
              ],
              paginatorInfo: {
                currentPage: 1,
                perPage: 20,
                total: 2,
                lastPage: 1,
              },
            },
          },
        },
      },
    ],
  },
};

export const Error = Template.bind({});
Error.args = { searchTerm: 'error' };
Error.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: SEARCH_RESORTS,
          variables: { query: 'error', perPage: 400 },
        },
        error: new Error('An error occurred'),
      },
    ],
  },
};

export const NoResults = Template.bind({});
NoResults.args = { searchTerm: 'noresults' };
NoResults.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: SEARCH_RESORTS,
          variables: { query: 'noresults', perPage: 400 },
        },
        result: {
          data: {
            searchResorts: {
              data: [],
              paginatorInfo: {
                currentPage: 1,
                perPage: 20,
                total: 0,
                lastPage: 1,
              },
            },
          },
        },
      },
    ],
  },
};
