import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import wait from 'waait';
import waitForExpect from 'wait-for-expect';
import DynamicSwitch, { QUERY_CMS_PAGES } from '../DynamicSwitch';
import queryCMSPage from '../../../utility/query-cms-page';
import DynamicLayout from '../../DynamicLayout/DynamicLayout';
import NoCacheMockedProvider from '../../tests/NoCacheMockedProvider/NoCacheMockedProvider';
import ViewContext from '../../ViewContext/ViewContext';

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

const contextData = {
  layouts: {
    foo: () => <h1>Foo layout</h1>,
    fooBar: () => <h1>FooBar layout</h1>,
  },
};

describe('Test <DynamicSwitch />', () => {
  beforeEach(() => {
    Object.defineProperty(global.window, 'scrollTo', { value: jest.fn() });
  });

  it('Produces routes from CMS data for "/foo"', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/foo']}>
        <NoCacheMockedProvider mocks={[mocks.cmsPages, mocks.cmsPageFoo]}>
          <ViewContext.Provider value={contextData}>
            <DynamicSwitch />
          </ViewContext.Provider>
        </NoCacheMockedProvider>
      </MemoryRouter>,
    );

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(async () => wait(100));

    await waitForExpect(async () => {
      wrapper.update();

      const { url } = wrapper.find(DynamicLayout).first().props();

      expect(url).toBe('/foo');
      expect(wrapper.html()).toContain('Foo layout');
    });
  });

  it('Produces routes from CMS data for "/foo/bar"', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/foo/bar']}>
        <NoCacheMockedProvider mocks={[mocks.cmsPages, mocks.cmsPageFooBar]}>
          <ViewContext.Provider value={contextData}>
            <DynamicSwitch />
          </ViewContext.Provider>
        </NoCacheMockedProvider>
      </MemoryRouter>,
    );

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(async () => wait(100));

    await waitForExpect(async () => {
      wrapper.update();

      const { url } = wrapper.find(DynamicLayout).first().props();

      expect(url).toBe('/foo/:bar');
      expect(wrapper.html()).toContain('FooBar layout');
    });
  });
});
