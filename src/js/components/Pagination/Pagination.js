import React, { useEffect } from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import { NumberParam, withQueryParams } from 'use-query-params';
import PropTypes from 'prop-types';

const Pagination = ({
  lastPage,
  paginationTabLimit,
  size,
  query,
  setQuery,
  currentPage,
}) => {
  const currentPageIndex = query.page || currentPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageIndex]);

  const floor = Math.min(
    Math.max(
      1,
      currentPageIndex - Math.floor(paginationTabLimit / 2),
    ),
    Math.max(
      1,
      lastPage - paginationTabLimit + 1,
    ),
  );

  const pageSeq = Array.from(
    { length: paginationTabLimit },
    (x, i) => i + floor,
  );

  const ellipsis = {
    name: '...',
    ariaLabel: '...',
    disabled: true,
    setPageTo: null,
  };

  // Left-hand pagination controls
  const receding = [
    {
      name: '«',
      ariaLabel: 'First',
      disabled: currentPageIndex === 1,
      setPageTo: 1,
    },
    {
      name: '‹',
      ariaLabel: 'Previous',
      disabled: currentPageIndex === 1,
      setPageTo: currentPage - 1,
    },
  ];

  if (Math.min(...pageSeq) > 1) {
    // Indication that the pagination is off the floor
    receding.push(ellipsis);
  }

  // Right-hand pagination controls
  const proceeding = [
    {
      name: '›',
      ariaLabel: 'Next',
      disabled: lastPage === currentPageIndex,
      setPageTo: currentPageIndex + 1,
    },
    {
      name: '»',
      ariaLabel: 'Last',
      disabled: lastPage === currentPageIndex,
      setPageTo: lastPage,
    },
  ];

  if (Math.max(...pageSeq) < lastPage) {
    // Indication that the pagination hasn't reached the ceiling
    proceeding.unshift(ellipsis);
  }
  // Combined pagination controls
  const paginationData = [
    ...receding,
    ...pageSeq.map((x) => ({
      name: x,
      ariaLabel: x,
      active: currentPageIndex === x,
      setPageTo: x,
    })),
    ...proceeding,
  ];

  return (
    <CPagination align="center" size={size} aria-label="Page navigation">
      {paginationData.map((x) => (
        <CPaginationItem
          key={x.ariaLabel}
          aria-label={x.ariaLabel}
          disabled={x.disabled}
          active={x.active}
          onClick={() => setQuery({ page: x.setPageTo })}
        >
          {x.name}
        </CPaginationItem>
      ))}
    </CPagination>
  );
};

export const paginationSize = {
  sm: 'sm',
  lg: 'lg',
};

Pagination.defaultProps = {
  paginationTabLimit: 3,
  currentPage: 1,
  size: paginationSize.sm,
};

Pagination.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.number,
  }).isRequired,
  setQuery: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  paginationTabLimit: PropTypes.number,
  size: PropTypes.oneOf([paginationSize.sm, paginationSize.lg]),
};

export default withQueryParams({
  page: NumberParam,
}, Pagination);
