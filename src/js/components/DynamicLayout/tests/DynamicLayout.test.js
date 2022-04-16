import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import queryCMSPage from '../../../utility/query-cms-page';
import NoCacheMockedProvider from '../../tests/NoCacheMockedProvider/NoCacheMockedProvider';
import ViewContext from '../../ViewContext/ViewContext';
import DynamicLayout from '../DynamicLayout';

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

const contextData = {
  layouts: {
    foo: () => <h1>Foo layout</h1>,
    fooBar: () => <h1>FooBar layout</h1>,
  },
};

describe('Test <DynamicLayout />', () => {
  it('Fails when the CMS does not provide data for the current url', async () => {
    const wrapper = mount(
      <NoCacheMockedProvider mocks={[mocks.cmsPageFailure]}>
        <ViewContext.Provider value={contextData}>
          <DynamicLayout url="/foo" />
        </ViewContext.Provider>
      </NoCacheMockedProvider>,
    );

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(async () => wait(100));

    wrapper.update();
    expect(wrapper.html()).toBe('');
  });

  it('Renders layout for /foo', async () => {
    const wrapper = mount(
      <NoCacheMockedProvider mocks={[mocks.cmsPageFoo]}>
        <ViewContext.Provider value={contextData}>
          <DynamicLayout url="/foo" />
        </ViewContext.Provider>
      </NoCacheMockedProvider>,
    );

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(async () => wait(100));

    wrapper.update();
    expect(wrapper.html()).toContain('Foo layout');
  });

  it('Renders layout for /foo/:bar', async () => {
    const wrapper = mount(
      <NoCacheMockedProvider mocks={[mocks.cmsPageFooBar]}>
        <ViewContext.Provider value={contextData}>
          <DynamicLayout url="/foo/:bar" />
        </ViewContext.Provider>
      </NoCacheMockedProvider>,
    );

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(async () => wait(100));

    wrapper.update();
    expect(wrapper.html()).toContain('FooBar layout');
  });
});
