import React, { useRef } from 'react';
import {
  withQueryParams,
  NumberParam,
} from 'use-query-params';
import { JsonParam } from 'serialize-query-params';
import PropTypes from 'prop-types';
import ResortCardError from '../ResortCard/ResortCardError/ResortCardError';
import ResortCardSkeleton from '../SkeletonState/ResortCardSkeleton';
import useQueryResorts from '../../hooks/useQueryResorts';
import ResortCardHome from '../ResortCardHome/ResortCardHome';
import ResortCardNoResults from '../ResortCard/ResortCardNoResults/ResortCardNoResults';

const HomeRankedResortList = ({ query, cardLimit, lifestyle }) => {
  const {
    page: num,
    filters: filtersObject,
    orderBy: orderByObject,
  } = query;
  const { loading, data, error } = useQueryResorts(
    cardLimit,
    Number(num) || 1,
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
        <h3 className="lifestyles">
          Top 5
          {` ${lifestyle} `}
          Resorts
        </h3>
        <div className="ranked-resort-list--loading col-sm-12">
          <div
            className="home-ranked-resort-list ranked-resort-list__resort-card-list-wrap d-flex flex-wrap justify-content-center gap-4"
          >
            {Array.from({ length: cardLimit }, (x, i) => i)
              .map((index) => (
                <ResortCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </div>
    );
  }

  const { resorts: { data: resorts } } = data;

  return (
    <div key={lifestyle} className="home-ranked-resort-list">
      <h3 className="lifestyles">
        Top 5
        {` ${lifestyle} `}
        Resorts
      </h3>
      <div
        className="home-ranked-resort-list ranked-resort-list__resort-card-list-wrap d-flex flex-wrap justify-content-center gap-4"
      >
        {resorts?.length >= 1 ? resorts.map((resort) => (
          <ResortCardHome key={resort.id} resortData={resort} />
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

HomeRankedResortList.defaultProps = {
  lifestyle: 'Family',
};

HomeRankedResortList.propTypes = {
  cardLimit: PropTypes.number.isRequired,
  lifestyle: PropTypes.string,
  query: PropTypes.shape({
    page: PropTypes.number,
    orderBy: PropTypes.shape({
      type_name: PropTypes.string,
      direction: PropTypes.string,
    }),
    filters: PropTypes.shape({
      groupedType: PropTypes.arrayOf(PropTypes.shape({
        type_name: PropTypes.string,
        operator: PropTypes.string,
        value: PropTypes.string || PropTypes.number,
      })),
      locationType: PropTypes.shape({
        countryId: PropTypes.arrayOf(PropTypes.string),
        continentId: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default withQueryParams({
  page: NumberParam,
  orderBy: JsonParam,
  filters: JsonParam,
}, HomeRankedResortList);
