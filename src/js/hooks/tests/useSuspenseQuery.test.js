import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { QUERY_HEALTH_CHECK } from '../../components/Debug/Debug';
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
      errors: [],
    },
  },
};

const queries = [
  gql`
    {
      healthCheck
    }`,
];

describe('useSuspenseQuery hook', () => {
  it('Supplies a promise', () => {
    let actual;

    mount(
      <MockedProvider mocks={[mocks.healthCheckSuccess]} addTypename={false}>
        <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
      </MockedProvider>,
    );

    expect(actual.read).toThrow(Promise);
  });

  it('Supplies queries successfully', async () => {
    let actual;

    mount(
      <MockedProvider mocks={[mocks.healthCheckSuccess]} addTypename={false}>
        <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
      </MockedProvider>,
    );

    expect(actual.read).toThrow(Promise);

    // Warning: An update to Debug inside a test was not wrapped in act(...).
    await act(wait);

    const { data: { healthCheck }, loading } = actual.read()[0];

    expect(healthCheck).toBeTruthy();
    expect(loading).toBeFalsy();
  });

  it('Supplies throws errors', async () => {
    let actual;

    mount(
      <MockedProvider mocks={[mocks.healthCheckError]} addTypename={false}>
        <TestSuspenseQuery queries={queries} callback={(query) => { actual = query; }} />
      </MockedProvider>,
    );

    expect(actual.read).toThrowError();
  });
});
