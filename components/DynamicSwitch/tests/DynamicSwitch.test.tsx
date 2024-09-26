import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import DynamicSwitch, { QUERY_CMS_PAGES } from '../DynamicSwitch';
import queryCMSPage from '../../../utility/query-cms-page';
import { layoutsAtom } from '../../../atoms/layoutsType';

const mocks = {
  cmsPagesEmpty: {
    request: {
      query: QUERY_CMS_PAGES,
    },
    result: {
      data: {
        cmsPages: [],
      },
    },
  },
  cmsPages: {
    request: {
      query: QUERY_CMS_PAGES,
    },
    result: {
      data: {
        cmsPages: [
          {
            url: '/foo',
          },
          {
            url: '/foo/:bar',
          },
        ],
      },
    },
  },
  cmsPageFoo: {
    request: queryCMSPage('/foo'),
    result: {
      data: {
        cmsPage: {
          layout: 'foo',
        },
      },
    },
  },
  cmsPageFooBar: {
    request: queryCMSPage('/foo/:bar'),
    result: {
      data: {
        cmsPage: {
          layout: 'fooBar',
        },
      },
    },
  },
};

const layouts = {
  foo: () => <h1>Foo layout</h1>,
  fooBar: () => <h1>FooBar layout</h1>,
};

const AllTheProviders = ({ children, testMocks, initialEntries }) => (
  <RecoilRoot initializeState={({ set }) => set(layoutsAtom, layouts)}>
    <MockedProvider mocks={testMocks} addTypename={false}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </MockedProvider>
  </RecoilRoot>
);

describe('Test <DynamicSwitch />', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', { value: jest.fn() });
  });

  it('Produces routes from CMS data for "/foo"', async () => {
    render(
      <AllTheProviders testMocks={[mocks.cmsPages, mocks.cmsPageFoo]} initialEntries={['/foo']}>
        <DynamicSwitch />
      </AllTheProviders>,
    );

    await waitFor(() => {
      expect(screen.getByText('Foo layout')).toBeInTheDocument();
    });
  });

  it('Produces routes from CMS data for "/foo/bar"', async () => {
    render(
      <AllTheProviders testMocks={[mocks.cmsPages, mocks.cmsPageFooBar]} initialEntries={['/foo/bar']}>
        <DynamicSwitch />
      </AllTheProviders>,
    );

    await waitFor(() => {
      expect(screen.getByText('FooBar layout')).toBeInTheDocument();
    });
  });
});
