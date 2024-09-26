import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { RecoilRoot } from 'recoil';
import queryCMSPage from '../../../utility/query-cms-page';
import DynamicLayout from '../DynamicLayout';
import { layoutsAtom } from '../../../atoms/layoutsType';

const mocks = {
  cmsPageFailure: {
    request: queryCMSPage('/foo'),
    error: new Error('An error occurred'),
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

const AllTheProviders = ({ children, testMocks }) => (
  <RecoilRoot initializeState={({ set }) => set(layoutsAtom, layouts)}>
    <MockedProvider mocks={testMocks} addTypename={false}>
      {children}
    </MockedProvider>
  </RecoilRoot>
);

describe('Test <DynamicLayout />', () => {
  it('Fails when the CMS does not provide data for the current url', async () => {
    render(
      <AllTheProviders testMocks={[mocks.cmsPageFailure]}>
        <DynamicLayout url="/foo" />
      </AllTheProviders>,
    );

    await waitFor(() => {
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  it('Renders layout for /foo', async () => {
    render(
      <AllTheProviders testMocks={[mocks.cmsPageFoo]}>
        <DynamicLayout url="/foo" />
      </AllTheProviders>,
    );

    await waitFor(() => {
      expect(screen.getByText('Foo layout')).toBeInTheDocument();
    });
  });

  it('Renders layout for /foo/:bar', async () => {
    render(
      <AllTheProviders testMocks={[mocks.cmsPageFooBar]}>
        <DynamicLayout url="/foo/:bar" />
      </AllTheProviders>,
    );

    await waitFor(() => {
      expect(screen.getByText('FooBar layout')).toBeInTheDocument();
    });
  });
});
