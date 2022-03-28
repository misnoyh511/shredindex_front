import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import NoCacheMockedProvider from '../../tests/NoCacheMockedProvider/NoCacheMockedProvider';
import Debug, { QUERY_HEALTH_CHECK } from '../Debug';

const mocks = {
  healthCheckSuccess: {
    request: {
      query: QUERY_HEALTH_CHECK,
    },
    result: {
      data: {
        healthCheck: true,
      },
    },
  },
  healthCheckFailed: {
    request: {
      query: QUERY_HEALTH_CHECK,
    },
    result: {
      data: {
        healthCheck: false,
      },
    },
  },
};

describe('Test <Debug />', () => {
  it('succeeds a graphql healthcheck', async () => {
    const wrapper = mount(
      <NoCacheMockedProvider mocks={[mocks.healthCheckSuccess]}>
        <Debug />
      </NoCacheMockedProvider>,
    );

    expect(wrapper.html()).toContain('Loading...');

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(wait);

    wrapper.update();
    expect(wrapper.html()).toContain('Graphql server health check succeeded');
  });

  it('fails a graphql healthcheck', async () => {
    const wrapper = mount(
      <NoCacheMockedProvider mocks={[mocks.healthCheckFailed]}>
        <Debug />
      </NoCacheMockedProvider>,
    );

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(wait);

    wrapper.update();
    expect(wrapper.html()).toContain('Graphql server health check failed');
  });
});
