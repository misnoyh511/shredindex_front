import React from 'react';
import {
  CCard, CCardBody, CCardHeader,
} from '@coreui/react';

const ResortHeaderSkeleton = () => (
  <div className="resort-card--skeleton d-flex justify-content-center fade-in w-100">
    <CCard className="resort-card__wrap collapsed w-100">
      <CCardHeader className="resort-card__header-wrap pb-0 mb-2">
        <div className="skeleton-card__header d-flex mb-3">
          <div className="skeleton skeleton-icon me-3" style={{ width: '40px', height: '40px' }} />
          <div className="skeleton skeleton-text w-100" style={{ height: '24px' }} />
        </div>
        <div className="resort-card__location skeleton-location d-flex mb-2">
          <div className="skeleton skeleton-icon resort-card__country-flag-wrap country-flag-wrap me-3" style={{ width: '24px', height: '24px' }} />
          <div className="skeleton skeleton-text w-50" style={{ height: '20px' }} />
        </div>
      </CCardHeader>
      <CCardBody className="resort-card__body pt-0 pb-0 mb-3">
        <div className="skeleton-content-wrap d-flex mb-2">
          <div className="skeleton skeleton-text w-75" style={{ height: '16px' }} />
        </div>
        <div className="skeleton-content-wrap d-flex mb-2">
          <div className="skeleton skeleton-text w-50" style={{ height: '16px' }} />
        </div>
      </CCardBody>
    </CCard>
  </div>
);

export default ResortHeaderSkeleton;
