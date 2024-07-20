import React from 'react';
import { FormattedMessage } from 'react-intl';

const ResortImageCarouselSkeleton = () => (
  <div className="resort-single resort-single__image-carousel mb-2">
    <div className="h6 user-select-none mb-2">
      <FormattedMessage id="shredindex.resort.IMAGES" defaultMessage="Images" />
    </div>
    <div className="carousel w-100 h-100 mb-4">
      <div className="d-flex overflow-hidden">
        {[...Array(4)].map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="resort-single__carousel-image-item-wrap gray-400-bg border-radius-medium me-3"
            style={{
              width: '20rem',
              height: '12rem',
              flexShrink: 0,
              animation: 'skeleton-loading 1s infinite alternate',
            }}
          >
            <div
              className="w-100 h-100 border-radius-medium"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ResortImageCarouselSkeleton;
