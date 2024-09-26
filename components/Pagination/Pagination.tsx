import React, { useEffect, useState } from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import { useRouter } from 'next/router';

export const paginationSize = {
  sm: 'sm',
  lg: 'lg',
} as const;

type PaginationSize = typeof paginationSize[keyof typeof paginationSize];

interface PaginationProps {
  lastPage: number;
  paginationTabLimit?: number;
  size?: PaginationSize;
  currentPage?: number;
}

interface PaginationItem {
  name: string | number;
  ariaLabel: string;
  disabled?: boolean;
  active?: boolean;
  setPageTo: number | null;
}

const Pagination: React.FC<PaginationProps> = ({
  lastPage,
  paginationTabLimit = 3,
  size: initialSize = paginationSize.sm,
  currentPage = 1,
}) => {
  const router = useRouter();
  const [size, setSize] = useState<PaginationSize | null>(null);
  const currentPageIndex = parseInt(router.query.page as string, 10) || currentPage;

  useEffect(() => {
    setSize(initialSize);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPageIndex, initialSize]);

  const floor = Math.min(
    Math.max(1, currentPageIndex - Math.floor(paginationTabLimit / 2)),
    lastPage,
  );

  const sequenceLength = Math.min(paginationTabLimit, lastPage - floor + 1);

  const pageSeq = lastPage > 1
    ? Array.from({ length: sequenceLength }, (_, i) => i + floor)
    : [1];

  const ellipsis: PaginationItem = {
    name: '...',
    ariaLabel: '...',
    disabled: true,
    setPageTo: null,
  };

  const receding: PaginationItem[] = [
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
      setPageTo: currentPageIndex - 1,
    },
  ];

  const proceeding: PaginationItem[] = [
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

  if (lastPage > 1 && Math.min(...pageSeq) > 1) receding.push(ellipsis);
  if (lastPage > 1 && Math.max(...pageSeq) < lastPage) proceeding.unshift(ellipsis);

  const paginationData: PaginationItem[] = [
    ...receding,
    ...pageSeq.map((x) => ({
      name: x,
      ariaLabel: `Page ${x}`,
      active: currentPageIndex === x,
      setPageTo: x,
    })),
    ...proceeding,
  ];

  const handlePageChange = (newPage: number | null) => {
    if (newPage !== null) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: newPage.toString() },
      }, undefined, { scroll: false });
    }
  };

  if (size === null) {
    // Return null or a loading state while waiting for client-side hydration
    return null;
  }

  return (
    <CPagination align="center" size={size} aria-label="Page navigation">
      {paginationData.map((x) => (
        <CPaginationItem
          key={x.ariaLabel}
          aria-label={x.ariaLabel}
          disabled={x.disabled}
          active={x.active}
          onClick={() => handlePageChange(x.setPageTo)}
        >
          {x.name}
        </CPaginationItem>
      ))}
    </CPagination>
  );
};

export default Pagination;
