import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
import { MockedProvider } from '@apollo/react-testing';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import RankedResortListComponent from '../../../components/RankedResortList/RankedResortList';
import ResortsParallaxBackground from '../../../components/ResortsParallaxBackground/ResortsParallaxBackground';
import langEn from '../../../lang/en.json';
import ResortCardSkeleton from '../../../components/SkeletonState/ResortCardSkeleton';
import { QUERY_RESORTS } from '../../../hooks/useQueryResorts';
import RankedResortFilterMenuSkeleton from '../../../components/RankedResortFilterMenu/RankedResortFilterMenuSkeleton';
import RankedResortResultCountSkeleton from '../../../components/RankedResortResultCount/RankedResortResultCountSkeleton';
import resortOne from '../../../cypress/e2e/RankedResortList/dummyResortOne';
import resortTwo from '../../../cypress/e2e/RankedResortList/dummyResortTwo';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

export default {
  title: 'Shred index/components',
  component: RankedResortListComponent,
  argTypes: {
    listState: {
      name: 'List state',
      options: ['Full', 'Loading', 'Error'],
      control: { type: 'select' },
    },
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { first: '2', page: '1' },
      },
      routing: { path: '/resorts/?page=:page' },
    }),
  },
  decorators: [
    (Story) => {
      const [currentPage, setCurrentPage] = useState('1');
      const [key, setKey] = useState(0);

      const mockRouter = {
        basePath: '',
        pathname: '/',
        route: '/',
        asPath: '/',
        query: { page: currentPage },
        push: (url) => {
          let newPage = '1';
          if (typeof url === 'object' && url.query && url.query.page) {
            newPage = url.query.page;
          }
          setCurrentPage(newPage);
          setKey(prevKey => prevKey + 1);  // Force re-render
          return Promise.resolve(true);
        },
        replace: () => Promise.resolve(true),
        reload: () => Promise.resolve(true),
        back: () => {},
        prefetch: () => Promise.resolve(),
        beforePopState: () => {},
        events: {
          on: () => {},
          off: () => {},
          emit: () => {},
        },
        isFallback: false,
      };

      return (
        <RouterContext.Provider value={mockRouter}>
          <div key={key}>
            <Story />
          </div>
        </RouterContext.Provider>
      );
    },
  ],
};

export const RankedResortList = (args) => {
  const { listState } = args;
  const cardLimit = 5;
  const maxPages = 10;

  const mocks = {
    resortsPage1WithFilter: {
      request: {
        query: QUERY_RESORTS,
        variables: {
          first: 5,
          page: 1,
          filter: undefined,
        },
      },
      result: {
        data: {
          resorts: {
            data: [
              resortOne,
              resortTwo,
              resortOne,
              resortTwo,
              resortOne,
            ],
            paginatorInfo: {
              total: 12,
              currentPage: 1,
              lastPage: 3,
            },
          },
        },
      },
    },
    resortsPage2: {
      request: {
        query: QUERY_RESORTS,
        variables: {
          first: 5,
          page: 2,
        },
      },
      result: {
        data: {
          resorts: {
            data: [
              resortTwo,
              resortOne,
              resortTwo,
              resortOne,
              resortTwo,
            ],
            paginatorInfo: {
              total: 12,
              currentPage: 2,
              lastPage: 3,
            },
          },
        },
      },
    },
    resortsPage3: {
      request: {
        query: QUERY_RESORTS,
        variables: {
          first: 5,
          page: 3,
        },
      },
      result: {
        data: {
          resorts: {
            data: [
              resortOne,
              resortTwo,
            ],
            paginatorInfo: {
              total: 12,
              currentPage: 3,
              lastPage: 3,
            },
          },
        },
      },
    },
    resortsError: {
      request: {
        query: QUERY_RESORTS,
        variables: {
          first: 0,
          page: 5,
        },
      },
      result: {
        data: {
          resorts: {
            data: [
              [
                resortOne,
                resortTwo,
              ],
            ],
            paginatorInfo: {
              currentPage: 3,
              lastPage: 3,
            },
          },
        },
      },
    },
  };

  if (listState === 'Loading') {
    return (
      <div className="ranked-resort-list">
        <div className="ranked-resort-list__filters-wrap col-sm-12 w-100">
          <RankedResortFilterMenuSkeleton />
        </div>
        <div className="ranked-resort-list__result-count-wrap col-sm-12 w-100">
          <RankedResortResultCountSkeleton />
        </div>
        <div className="ranked-resort-list--loading col-sm-12">
          {Array.from({ length: cardLimit }, (x, i) => i).map((index) => (
            <ResortCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (listState === 'Error') {
    return (
      <MemoryRouter initialEntries={['?first=2', '?page=1']}>
        <IntlProvider locale="en" messages={langEn}>
          <RecoilRoot>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <MockedProvider
                mocks={[mocks.resortsError]}
                addTypename={false}
              >
                <RankedResortListComponent cardLimit={cardLimit} maxPages={maxPages} />
              </MockedProvider>
            </QueryParamProvider>
          </RecoilRoot>
        </IntlProvider>
      </MemoryRouter>
    );
  }

  return (
    <MemoryRouter initialEntries={['?first=2', '?page=1']}>
      <IntlProvider locale="en" messages={langEn}>
        <RecoilRoot>
          <MockedProvider
            mocks={[
              mocks.resortsPage1WithFilter,
              mocks.resortsPage2,
              mocks.resortsPage3,
            ]}
            addTypename={false}
          >
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <ResortsParallaxBackground />
              <RankedResortListComponent cardLimit={cardLimit} maxPages={maxPages} />
            </QueryParamProvider>
          </MockedProvider>
        </RecoilRoot>
      </IntlProvider>
    </MemoryRouter>
  );
};
