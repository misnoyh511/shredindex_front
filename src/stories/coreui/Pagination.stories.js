import React from 'react';
import {
  QueryParamProvider,
} from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { withRouter } from 'storybook-addon-react-router-v6';
import PaginationComponent from '../../js/components/Pagination/Pagination';

export default {
  title: 'Shred index/components',
  component: PaginationComponent,
  decorators: [withRouter],
};

export const Pagination = () => {
  const mocks = {
    lastPage: 10,
    paginationTabLimit: 3,
    size: 'lg',
  };

  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <PaginationComponent
        paginationTabLimit={mocks.paginationTabLimit}
        size={mocks.size}
        lastPage={mocks.lastPage}
      />
    </QueryParamProvider>
  );
};
