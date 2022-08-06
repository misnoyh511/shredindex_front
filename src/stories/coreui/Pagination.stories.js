import React from 'react';
import {
  QueryParamProvider,
} from 'use-query-params';
import { MemoryRouter, Route } from 'react-router-dom';
import PaginationComponent from '../../js/components/Pagination/Pagination';

export default {
  title: 'Shred index/components',
  component: PaginationComponent,
};

export const Pagination = () => {
  const mocks = {
    lastPage: 10,
    paginationTabLimit: 3,
    size: 'lg',
  };

  return (
    <MemoryRouter initialEntries={['?page=1']}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <PaginationComponent
          paginationTabLimit={mocks.paginationTabLimit}
          size={mocks.size}
          lastPage={mocks.lastPage}
        />
      </QueryParamProvider>
    </MemoryRouter>
  );
};
