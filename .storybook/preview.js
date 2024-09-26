import React from 'react';
import '../src/scss/style.scss';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import  { MockNextRouter } from './mockNextRouter';

const createMockRouter = (overrides = {}) => ({
  push: () => Promise.resolve(),
  replace: () => Promise.resolve(),
  prefetch: () => Promise.resolve(),
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isReady: true,
  ...overrides,
});

export const decorators = [
  (Story, context) => {
    const router = createMockRouter(context.parameters.nextRouter);
    return (
      <MockNextRouter router={router}>
        <Story />
      </MockNextRouter>
    );
  },
];

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
    path: "/",
    asPath: "/",
    query: {},
  },
};

export default {
  decorators,
  parameters,
};
