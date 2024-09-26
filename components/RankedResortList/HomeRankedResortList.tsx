import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import ResortCardError from '../ResortCard/ResortCardError/ResortCardError';
import useQueryResorts from '../../hooks/useQueryResorts';
import HomeResortCard from '../HomeResortCard/HomeResortCard';
import ResortCardNoResults from '../ResortCard/ResortCardNoResults/ResortCardNoResults';
import HomeResortCardSkeleton from '../SkeletonState/HomeResortCardSkeleton';

interface QueryParams {
  page?: string;
  orderBy?: string;
  filters?: string;
}

interface HomeRankedResortListProps {
  cardLimit: number;
  lifestyle?: string;
}

const HomeRankedResortList: React.FC<HomeRankedResortListProps> = ({ cardLimit, lifestyle = 'Family' }) => {
  const router = useRouter();

  // Extract and parse the query parameters from the router
  const {
    page: num = '1',
    filters: filtersString = '{}',
    orderBy: orderByString = '{}',
  } = router.query as QueryParams;

  const filtersObject = JSON.parse(filtersString);
  const orderByObject = JSON.parse(orderByString);

  const { loading, data, error } = useQueryResorts(
    cardLimit,
    Number(num),
    filtersObject,
    orderByObject,
  );
  const maxPageState = useRef({ key: '', maxPages: 0 });
  const key = [cardLimit].join('-');

  if (maxPageState.current.key !== key) {
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
        <h3 className="lifestyles">
          Top
          {' '}
          {cardLimit}
          {` ${lifestyle} `}
          Resorts
        </h3>
        <div
          className="home-ranked-resort-list ranked-resort-list__resort-card-list-wrap d-flex flex-wrap justify-content-center gap-4"
        >
          {Array.from({ length: cardLimit }, (_, i) => (
            <HomeResortCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const resorts = data?.resorts?.data || [];

  return (
    <div key={lifestyle} className="home-ranked-resort-list">
      <h3 className="lifestyles">
        Top
        {' '}
        {cardLimit}
        {` ${lifestyle} `}
        Resorts
      </h3>
      <div
        className="home-ranked-resort-list ranked-resort-list__resort-card-list-wrap d-flex flex-wrap justify-content-center gap-4"
      >
        {resorts.length >= 1 ? resorts.map((resort) => (
          <HomeResortCard key={resort.id} resortData={resort} />
        )) : (
          <ResortCardNoResults
            helpId="shredindex.resortcardnoresorts.HELP"
            help="Let's try and get you back in side the boundary."
            titleId="shredindex.resortcardnoresorts.TITLE"
            title="Woah!!... Gnarly Crash"
            errorMessageId="shredindex.resortcardnoresorts.THEREARENORESULTSWITHYOURSEARCHCRITERIA"
            errorMessage="There was an error loading the list of resorts."
            suggestionId="shredindex.resortcardnoresorts.SUGGESTION"
            suggestion="Maybe try resetting the filters..."
          />
        )}
      </div>
    </div>
  );
};

export default HomeRankedResortList;
