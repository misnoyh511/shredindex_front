import React from 'react';
import { FormattedMessage } from 'react-intl';

const ResortNumericsSkeleton = () => (
  <div className="numeric-list">
    <div className="h6 user-select-none mb-2">
      <FormattedMessage id="shredindex.statistics.KEYINSIGHTS" defaultMessage="Key insights" />
    </div>
    <div className="numeric-list__list">
      <div className="d-flex overflow-hidden">
        {[...Array(4)].map((index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="numeric-list__numeric mb-3 me-3" style={{ flexShrink: 0 }}>
            <div className="statistic-skeleton" style={{ width: '150px', height: '70px' }}>
              <div className="skeleton-text w-75 mb-2" style={{ height: '16px' }} />
              <div className="skeleton-text w-50 mb-1" style={{ height: '24px' }} />
              <div className="skeleton-text w-25" style={{ height: '14px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ResortNumericsSkeleton;
