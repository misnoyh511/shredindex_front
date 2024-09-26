import React from 'react';

interface StatisticSkeletonProps {
  statisticType?: string;
}

const StatisticSkeleton: React.FC<StatisticSkeletonProps> = ({ statisticType = 'sub-statistic' }) => (
  <>
    <span className="statistic__title display-5 text-left user-select-none skeleton skeleton-text">
        &nbsp;
    </span>
    <div className={`statistic statistic--${statisticType}`}>
      <div className="d-flex statistic__number-bar-wrap">
        <div className="statistic__number-border">
          <div className="statistic__border--100 statistic__icon-wrap me-2 d-inline">
            <span className="skeleton skeleton-icon" />
          </div>
        </div>
        <div className="d-flex align-items-end">
          <span className="statistic__number-big display-5 text-left user-select-none skeleton skeleton-text me-1">
              &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
          </span>
          <span className="statistic__small-label user-select-none skeleton skeleton-text">
              &nbsp;&nbsp;
            &nbsp;&nbsp;
          </span>
        </div>
      </div>
      <div className="statistic__bar-container">
        <div className="statistic__bar skeleton skeleton-bar gray-400-bg" style={{ width: '50%' }} />
        <div
          className="statistic__bar-indicator skeleton skeleton-indicator gray-400-bg"
          style={{ left: '50%' }}
        />
      </div>
    </div>
  </>
);

export default StatisticSkeleton;
