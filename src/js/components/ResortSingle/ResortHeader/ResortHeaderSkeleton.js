import React from 'react';
import {
  CCard, CCardBody, CCardHeader,
} from '@coreui/react';

const ResortHeaderSkeleton = () => (
  <div className="resort-card--skeleton d-flex justify-content-center fade-in w-100">
    <CCard className="resort-card__wrap collapsed w-100">
      <CCardHeader className="resort-card__header-wrap pb-0 mb-2">
        <div className="skeleton-card__header d-flex mb-3">
          <div className="skeleton-rating-header me-3" />
          <div className="skeleton-background skeleton-rating-title w-100" />
        </div>
        <div className="resort-card__location skeleton-location d-flex mb-2">
          <div className="skeleton-background resort-card__country-flag-wrap country-flag-wrap me-3" />
          <div className="skeleton-background skeleton-location-details w-50" />
        </div>
      </CCardHeader>
      <CCardBody className="resort-card__body pt-0 pb-0 mb-3">
        <div className="skeleton-content-wrap d-flex mb-2">
          <div className="skeleton-text skeleton-sub-rating-wrap mt-2 me-2" />
        </div>
        <div className="skeleton-content-wrap d-flex mb-2">
          <div className="skeleton-text skeleton-sub-rating-wrap mt-2 me-2" />
        </div>
      </CCardBody>
    </CCard>
  </div>
);

export default ResortHeaderSkeleton;
