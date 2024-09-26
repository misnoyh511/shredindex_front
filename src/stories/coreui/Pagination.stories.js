import React, { useState } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import PaginationComponent from '../../../components/Pagination/Pagination';

export default {
  title: 'Shred index/components',
  component: PaginationComponent,
  decorators: [
    (Story) => {
      const [currentPage, setCurrentPage] = useState('1');

      const mockRouter = {
        basePath: '',
        pathname: '/',
        route: '/',
        asPath: '/',
        query: { page: currentPage },
        push: (url) => {
          let newPage = '1';
          if (typeof url === 'object' && url.query && url.query.page) {
            newPage = url.query.page;
          }
          setCurrentPage(newPage);
          return Promise.resolve(true);
        },
        replace: () => Promise.resolve(true),
        reload: () => Promise.resolve(true),
        back: () => {},
        prefetch: () => Promise.resolve(),
        beforePopState: () => {},
        events: {
          on: () => {},
          off: () => {},
          emit: () => {},
        },
        isFallback: false,
      };

      return (
        <RouterContext.Provider value={mockRouter}>
          <Story />
        </RouterContext.Provider>
      );
    },
  ],
};

export const Pagination = () => {
  const mocks = {
    lastPage: 10,
    paginationTabLimit: 3,
    size: 'lg',
  };

  return (
    <PaginationComponent
      paginationTabLimit={mocks.paginationTabLimit}
      size={mocks.size}
      lastPage={mocks.lastPage}
    />
  );
};
