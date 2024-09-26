import React, { Suspense } from 'react';
import { render, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { QUERY_HEALTH_CHECK } from '../../components/Debug/Debug';
import TestSuspenseQuery from './TestSuspenseQuery';
import * as useSuspenseQueryModule from '../useSuspenseQuery';

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
  healthCheckError: {
    request: {
      query: QUERY_HEALTH_CHECK,
    },
    result: {
      errors: [new Error('Health check failed')],
    },
  },
};

const customRender = (ui: React.ReactElement, options = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MockedProvider mocks={[mocks.healthCheckSuccess]} addTypename={false}>
        {children}
      </MockedProvider>
    ),
    ...options,
  });
};

describe('useSuspenseQuery hook', () => {
  it('Supplies a promise', async () => {
    let actual: any;
    const queries = [gql`{ healthCheck }`];
    const mockUseSuspenseQuery = jest.fn(() => ({
      read: jest.fn().mockImplementation(() => {
        throw new Promise(() => {});
      }),
    }));
    jest.spyOn(useSuspenseQueryModule, 'default').mockImplementation(mockUseSuspenseQuery);

    await act(async () => {
      customRender(
        <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
      );
    });

    expect(actual.read).toThrow(Promise);
  });

  it('Throws errors', async () => {
    let actual: any;
    const queries = [gql`{ healthCheck }`];
    const mockUseSuspenseQuery = jest.fn(() => ({
      read: jest.fn().mockImplementation(() => {
        throw new Error('Health check failed');
      }),
    }));
    jest.spyOn(useSuspenseQueryModule, 'default').mockImplementation(mockUseSuspenseQuery);

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      render(
        <MockedProvider mocks={[mocks.healthCheckError]} addTypename={false}>
          <Suspense fallback={<div>Loading...</div>}>
            <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
          </Suspense>
        </MockedProvider>
      );
    });

    expect(actual.read).toThrow('Health check failed');

    errorSpy.mockRestore();
  });

  it('Queries document nodes successfully', async () => {
    let actual: any;
    const queries = [gql`{ healthCheck }`];
    const mockUseSuspenseQuery = jest.fn(() => ({
      read: jest.fn().mockImplementation(() => [{
        data: { healthCheck: true },
        loading: false,
      }]),
    }));
    jest.spyOn(useSuspenseQueryModule, 'default').mockImplementation(mockUseSuspenseQuery);

    await act(async () => {
      customRender(
        <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
      );
    });

    const result = actual.read();
    expect(result.length).toBeGreaterThanOrEqual(1);

    const { data: { healthCheck }, loading } = result[0];
    expect(healthCheck).toBeTruthy();
    expect(loading).toBeFalsy();
  });
});
