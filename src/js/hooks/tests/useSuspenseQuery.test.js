import { gql } from '@apollo/client';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { QUERY_HEALTH_CHECK } from '../../components/Debug/Debug';
import NoCacheMockedProvider
, { noCacheMockClient } from '../../components/tests/NoCacheMockedProvider/NoCacheMockedProvider';
import suspenseQuery from '../../utility/suspense-query';
import TestSuspenseQuery from './TestSuspenseQuery';

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
      data: {
        healthCheck: false,
      },
      errors: [],
    },
  },
};

describe('useSuspenseQuery hook', () => {
  it('Supplies a promise', () => {
    let actual;

    const queries = [
      gql`
      {
        healthCheck
      }`,
    ];

    mount(
      <NoCacheMockedProvider mocks={[mocks.healthCheckSuccess]}>
        <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
      </NoCacheMockedProvider>,
    );

    expect(actual.read).toThrow(Promise);
  });

  it('Throws errors', () => {
    let actual;

    const queries = [
      gql`
      {
        healthCheck
      }`,
    ];

    mount(
      <NoCacheMockedProvider mocks={[mocks.healthCheckError]}>
        <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
      </NoCacheMockedProvider>,
    );

    expect(actual.read).toThrowError();
  });

  it('Catches malformed query shapes', () => {
    const client = noCacheMockClient();
    const queries = [
      {
        arbitrary: 'bad query item shape',
      },
    ];

    try {
      suspenseQuery(client, queries);
      // Fail the test if code continues to here without an error
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.message).toContain('have the "query" property with a gql DocumentNode');
    }
  });

  it('Catches invalid query values', () => {
    const client = noCacheMockClient();
    const queries = [
      {
        query: 'bad query item query value',
      },
    ];

    try {
      suspenseQuery(client, queries);
      // Fail the test if code continues to here without an error
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toContain('have the "query" property with a gql DocumentNode');
    }
  });

  it('Queries document nodes successfully', async () => {
    let actual;

    const queries = [
      gql`
      {
        healthCheck
      }`,
    ];

    mount(
      <NoCacheMockedProvider mocks={[mocks.healthCheckSuccess]}>
        <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
      </NoCacheMockedProvider>,
    );

    expect(actual.read).toThrow(Promise);

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(wait);

    expect(actual.read().length).toBeGreaterThanOrEqual(1);

    ((payload) => {
      const { data: { healthCheck }, loading } = payload;

      expect(healthCheck).toBeTruthy();
      expect(loading).toBeFalsy();
    })(actual.read()[0]);
  });
});
