import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MockedProvider, wait } from '@apollo/react-testing';
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

    // Comply with "not wrapped in act()" warning
    await act(async () => {
      // Wait for the GraphQL response data
      await wait(0);

      wrapper.update(); // Update the wrapper to reflect the new context
      expect(wrapper.html()).toContain('Graphql server health check succeeded');
    });
  });

  it('fails a graphql healthcheck', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.healthCheckFailed]} addTypename={false}>
        <Debug />
      </MockedProvider>,
    );

    expect(wrapper.html()).toContain('Loading...');

    // Comply with "not wrapped in act()" warning
    await act(async () => {
      // Wait for the GraphQL response data
      await wait(0);

      wrapper.update(); // Update the wrapper to reflect the new context
      expect(wrapper.html()).toContain('Graphql server health check failed');
    });
  });
});
