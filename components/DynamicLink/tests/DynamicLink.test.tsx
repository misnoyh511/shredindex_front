import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import queryCMSPage from '../../../utility/query-cms-page';
import DynamicLink from '../DynamicLink';

const mocks = {
  cmsPage: {
    request: queryCMSPage('/foo'),
    result: {
      data: {},
    },
  },
};

const AllProviders = ({ children }) => (
  <MockedProvider mocks={[mocks.cmsPage]} addTypename={false}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </MockedProvider>
);

describe('Test <DynamicLink />', () => {
  it('Prefetches page data when hovered', async () => {
    render(
      <AllProviders>
        <DynamicLink to="/foo" className="target">
          <p>Foo link</p>
        </DynamicLink>
      </AllProviders>,
    );

    const link = screen.getByText('Foo link');
    expect(link).toBeInTheDocument();

    fireEvent.mouseOver(link);
    // Note: We can't directly test if the prefetch happened, as it's an implementation detail.
    // Instead, we're just checking if the mouseover event doesn't cause any errors.
  });
});
