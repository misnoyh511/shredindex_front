import React from 'react';
import PropTypes from 'prop-types';

const RankedResortResultCount = ({ total, currentPage, lastPage }) => (
  <div className="ranked-resort-result-count ranked-resort-result-count__list-info col-sm-12 ">
    <div className="d-flex flex-column">
      <p className="ranked-resort-result-count__results-text me-auto">
        {total}
        {' '}
        results
      </p>
      <p className="ranked-resort-result-count__page-info-text me-auto">
        Page
        {' '}
        {currentPage}
        {' '}
        of
        {' '}
        {lastPage}
      </p>
    </div>
  </div>
);

RankedResortResultCount.propTypes = {
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
};

export default RankedResortResultCount;
