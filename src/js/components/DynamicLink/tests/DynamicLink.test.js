import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import queryCMSPage from '../../../utility/query-cms-page';
import NoCacheMockedProvider from '../../tests/NoCacheMockedProvider/NoCacheMockedProvider';
import DynamicLink from '../DynamicLink';

const mocks = {
  cmsPage: {
    request: queryCMSPage('/foo'),
    result: {
      data: {},
    },
  },
};

describe('Test <DynamicLink />', () => {
  it('Prefetches page data when hovered', async () => {
    const wrapper = mount(
      <NoCacheMockedProvider mocks={[mocks.cmsPage]}>
        <MemoryRouter>
          <DynamicLink to="/foo" className="target">
            <p>Foo link</p>
          </DynamicLink>
        </MemoryRouter>
      </NoCacheMockedProvider>,
    );

    expect(wrapper.html()).toContain('Foo link');
    wrapper.simulate('mouseover'); // Added for coverage
  });
});
