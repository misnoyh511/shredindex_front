import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
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
      <MockedProvider mocks={[mocks.healthCheckSuccess]} addTypename={false}>
        <Debug />
      </MockedProvider>,
    );

    expect(wrapper.html()).toContain('Loading...');

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(wait);

    wrapper.update();
    expect(wrapper.html()).toContain('Graphql server health check succeeded');
  });

  it('fails a graphql healthcheck', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.healthCheckFailed]} addTypename={false}>
        <Debug />
      </MockedProvider>,
    );

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(wait);

    wrapper.update();
    expect(wrapper.html()).toContain('Graphql server health check failed');
  });
});
