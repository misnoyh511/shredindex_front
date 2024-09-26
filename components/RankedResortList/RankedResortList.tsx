import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import ResortCard from '../ResortCard/ResortCard';
import Pagination, { paginationSize } from '../Pagination/Pagination';
import ResortCardError from '../ResortCard/ResortCardError/ResortCardError';
import ResortCardSkeleton from '../SkeletonState/ResortCardSkeleton';
import RankedResortFilterMenu from '../RankedResortFilterMenu/RankedResortFilterMenu';
import useQueryResorts from '../../hooks/useQueryResorts';
import useWindowDimensions from '../../hooks/getWindowDimensions';
import RankedResortResultCount from '../RankedResortResultCount/RankedResortResultCount';
import breakpoints from '../../src/js/components/config/breakpoints';
import RankedResortFilterMenuSkeleton from '../RankedResortFilterMenu/RankedResortFilterMenuSkeleton';
import RankedResortResultCountSkeleton from '../RankedResortResultCount/RankedResortResultCountSkeleton';
import ResortCardNoResults from '../ResortCard/ResortCardNoResults/ResortCardNoResults';
import { Resort } from '../../types/resortTypes';

interface QueryParams {
  page?: number;
  orderBy?: string; // Change to string to handle JSON string
  filters?: string; // Change to string to handle JSON string
}

interface RankedResortListProps {
  cardLimit: number;
}

const RankedResortList: React.FC<RankedResortListProps> = ({ cardLimit }) => {
  const router = useRouter();

  // Destructure and parse the query parameters
  const {
    page: num = '1',
    filters: filtersString = '{}', // Default to empty object as a JSON string
    orderBy: orderByString = '{}', // Default to empty object as a JSON string
  } = router.query as QueryParams;

  const filtersObject = JSON.parse(filtersString);
  const orderByObject = JSON.parse(orderByString);

  const { width } = useWindowDimensions();
  const { loading, data, error } = useQueryResorts(
    cardLimit,
    Number(num),
    filtersObject,
    orderByObject,
  );

  const maxPageState = useRef({ key: '', maxPages: 0 });
  const key = [cardLimit].join('-');

  if (maxPageState.current.key !== key) {
    // Update state without re-render
    maxPageState.current.key = key;
    maxPageState.current.maxPages = 0;
  }

  if (error) {
    return (
      <ResortCardError
        helpId="shredindex.resortcarderror.HELP"
        help="Looks like we french fried instead of pizza'd."
        titleId="shredindex.resortcarderror.TITLE"
        title="Woah!!... Gnarly Crash"
        errorName={error.name}
        errorMessageId="shredindex.resortcarderror.ERRORMESSAGE"
        errorMessage="There was an error loading the list of resorts."
        suggestionId="shredindex.resortcarderror.SUGGESTION"
        suggestion="Maybe try resetting the filters..."
      />
    );
  }

  if (loading) {
    return (
      <div className="ranked-resort-list">
        <div className="ranked-resort-list__filters-wrap col-sm-12 w-100">
          <RankedResortFilterMenuSkeleton />
        </div>
        <div className="ranked-resort-list__result-count-wrap col-sm-12 w-100">
          <RankedResortResultCountSkeleton />
        </div>
        <div className="ranked-resort-list--loading col-sm-12">
          {Array.from({ length: cardLimit }, (_, i) => (
            <ResortCardSkeleton key={i} />
          ))}
        </div>
        <Pagination
          currentPage={Number(num)}
          lastPage={maxPageState.current.maxPages}
          size={width > breakpoints.sm ? paginationSize.lg : paginationSize.sm}
        />
      </div>
    );
  }

  const {
    resorts: { data: resorts, paginatorInfo: { currentPage, lastPage, total } },
  } = data;

  if (maxPageState.current.maxPages !== lastPage) {
    maxPageState.current.maxPages = lastPage;
  }

  return (
    <div className="ranked-resort-list">
      <div className="ranked-resort-list__filters-wrap col-sm-12 w-100">
        <RankedResortFilterMenu
          filterQuantity={filtersObject.groupedType
            ? [...new Set(filtersObject.groupedType.map((i) => i.type_name))].length
            : 0}
        />
      </div>
      <div className="ranked-resort-list__result-count-wrap col-sm-12 w-100">
        <RankedResortResultCount total={total} currentPage={currentPage} lastPage={lastPage} />
      </div>
      <div className="ranked-resort-list__resort-card-list-wrap col-sm-12">
        {resorts && resorts.length >= 1 ? (
          resorts.map((resort: Resort) => <ResortCard key={resort.id} resortData={resort} />)
        ) : (
          <ResortCardNoResults
            helpId="shredindex.resortcardnoresorts.HELP"
            help="Let's try and get you back in side the boundary."
            titleId="shredindex.resortcardnoresorts.TITLE"
            title="You look a bit lost..."
            errorMessageId="shredindex.resortcardnoresorts.THEREARENORESULTSWITHYOURSEARCHCRITERIA"
            errorMessage="There was an error loading the list of resorts."
            suggestionId="shredindex.resortcardnoresorts.SUGGESTION"
            suggestion="Maybe try resetting the filters..."
          />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        lastPage={maxPageState.current.maxPages}
        size={width > breakpoints.sm ? paginationSize.lg : paginationSize.sm}
      />
    </div>
  );
};

export default RankedResortList;
