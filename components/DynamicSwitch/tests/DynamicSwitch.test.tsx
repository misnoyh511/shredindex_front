import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import DynamicSwitch, { QUERY_CMS_PAGES } from '../DynamicSwitch';

// Mock the layouts
jest.mock('../../../pages/_app', () => ({
  layouts: {
    foo: () => <div>Foo layout</div>,
    fooBar: () => <div>FooBar layout</div>, // Changed from 'foo/:bar' to 'fooBar'
  },
}));

// Mock the DynamicLayout component
jest.mock('../../DynamicLayout/DynamicLayout', () => ({
  __esModule: true,
  default: ({ layout }) => <div>{layout || 'default'} layout</div>,
}));

// Mock the ResortCardError component
jest.mock('../../ResortCard/ResortCardError/ResortCardError', () => ({
  __esModule: true,
  default: () => <div>404 Error</div>,
}));

// Mock the Apollo query
const mocks = [
  {
    request: {
      query: QUERY_CMS_PAGES,
    },
    result: {
      data: {
        cmsPages: [
          { url: '/foo', layout: 'foo' },
          { url: '/foo/:bar', layout: 'fooBar' }, // Changed from 'foo/:bar' to 'fooBar'
        ],
      },
    },
  },
];

describe('DynamicSwitch Component', () => {
  const renderWithRouter = (initialEntry: string) => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <DynamicSwitch />
        </MemoryRouter>
      </MockedProvider>,
    );
  };

  it('Produces routes from CMS data for "/foo"', async () => {
    renderWithRouter('/foo');

    await waitFor(() => {
      expect(screen.getByText('foo layout')).toBeInTheDocument();
    });
  });

  it('Produces routes from CMS data for "/foo/bar"', async () => {
    renderWithRouter('/foo/bar');

    await waitFor(() => {
      expect(screen.getByText('fooBar layout')).toBeInTheDocument();
    });
  });

  it('Renders 404 error for unknown route', async () => {
    renderWithRouter('/unknown');

    await waitFor(() => {
      expect(screen.getByText('404 Error')).toBeInTheDocument();
    });
  });
});
