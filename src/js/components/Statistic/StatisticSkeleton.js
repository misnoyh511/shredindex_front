import React from 'react';
import PropTypes from 'prop-types';

const StatisticSkeleton = ({ statisticType }) => {
  return (
    <>
      <span className="statistic__title display-5 text-left user-select-none skeleton-text">
        &nbsp;
      </span>
      <div className={`statistic statistic--${statisticType}`}>
        <div className="d-flex statistic__number-bar-wrap">
          <div className="statistic__number-border">
            <div className="statistic__border--100 statistic__icon-wrap me-2 d-inline">
              <span className="skeleton-icon"></span>
            </div>
          </div>
          <div className="d-flex align-items-end">
            <span className="statistic__number-big display-5 text-left user-select-none skeleton-text me-1">
              &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
            </span>
            <span className="statistic__small-label user-select-none skeleton-text">
              &nbsp;&nbsp;
              &nbsp;&nbsp;
            </span>
          </div>
        </div>
        <div className="statistic__bar-container">
          <div className="statistic__bar--100 statistic__bar skeleton-bar" style={{ width: '50%' }} />
          <div
            className="statistic__bar--100 statistic__bar-indicator skeleton-indicator"
            style={{ left: '50%' }}
          />
        </div>
      </div>
    </>
  );
};

StatisticSkeleton.propTypes = {
  statisticType: PropTypes.string,
};

StatisticSkeleton.defaultProps = {
  statisticType: 'sub-statistic',
};

export default StatisticSkeleton;
