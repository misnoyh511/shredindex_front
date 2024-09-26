import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
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
    render(
      <MockedProvider mocks={[mocks.healthCheckSuccess]} addTypename={false}>
        <Debug />
      </MockedProvider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Graphql server health check succeeded')).toBeInTheDocument();
    });
  });

  it('fails a graphql healthcheck', async () => {
    render(
      <MockedProvider mocks={[mocks.healthCheckFailed]} addTypename={false}>
        <Debug />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Graphql server health check failed')).toBeInTheDocument();
    });
  });
});
