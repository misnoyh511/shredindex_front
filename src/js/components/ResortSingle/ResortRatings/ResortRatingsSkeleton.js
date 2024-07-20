import React from 'react';
import { CCard, CCardBody, CListGroup } from '@coreui/react';
import { FormattedMessage } from 'react-intl';

const CategorySkeleton = () => (
  <div className="category-ratings mb-4">
    <div aria-label="category" className="category-title skeleton-text skeleton-background w-25 mb-2" style={{ height: '20px' }} />
    <div className="d-flex flex-wrap w-100">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="skeleton-sub-rating d-flex mb-3 w-50">
          <div className="skeleton-rating-header mt-1 me-3 skeleton-background" />
          <div className="skeleton-rating-title w-100 skeleton-background" />
        </div>
      ))}
    </div>
  </div>
);

const ResortRatingsSkeleton = () => (
  <div className="resort-ratings resort-card--skeleton">
    <h2 className="ratings-title h6">
      <FormattedMessage
        id="shredindex.rating.RATINGS"
        defaultMessage="Ratings"
      />
    </h2>
    <CCard className="ratings-card">
      <CCardBody>
        <CListGroup>
          <div className="ratings">
            {[1, 2, 3].map((index) => (
              <CategorySkeleton key={index} />
            ))}
          </div>
        </CListGroup>
      </CCardBody>
    </CCard>
  </div>
);

export default ResortRatingsSkeleton;
