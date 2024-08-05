import {
  CCard, CCardBody, CCardFooter, CCardHeader, CImage,
} from '@coreui/react';
import React from 'react';
import ResortImageLoading from '../../../images/resort-image-placeholder-loading.svg';
import ResortCardSubRatingSkeleton from './ResortCardSubRatingSkeleton';
import StatisticSkeleton from '../Statistic/StatisticSkeleton';
import resortImagePlaceholder from '../../../images/resort-image-placeholder.svg';

const HomeResortCardSkeleton = () => (
  <div className="resort-card resort-card--skeleton d-flex justify-content-center fade-in">
    <CCard className="full-expanded resort-card__wrap">
        <div className="w-100">
          <div className="single-image-container w-100 h-100 gray-300-bg border-radius-medium">
            <img className="carousel__image skeleton-image" src={ResortImageLoading}/>
          </div>
      </div>
      <CCardHeader className="resort-card__header-wrap pb-0 mb-2">
        <div className="skeleton-card__header d-flex mb-3">
          <div className="skeleton-rating-header me-3"/>
          <div className="skeleton-rating-title w-100"/>
        </div>
        <div className="resort-card__location skeleton-location d-flex mb-2">
          <div className="resort-card__country-flag-wrap country-flag-wrap me-3 "/>
          <div className="skeleton-location-details w-50"/>
        </div>
      </CCardHeader>
      <CCardBody className="resort-card__body pt-0 pb-0 mb-3">
        <div className="resort-card__content-1 mb-2 d-flex">
          <div className="w-100 d-flex gap-3">
            {[1, 2, 3, 4, 5].map((number) => (
              <div key={number} className="w-25">
                <StatisticSkeleton/>
              </div>
            ))}
          </div>
        </div>
        <div className="skeleton-content-wrap d-flex mb-2">
          <div className="skeleton-sub-rating-wrap mt-2 me-2">
            {[1, 2, 3].map((number) => <ResortCardSubRatingSkeleton key={number}/>)}
          </div>
          <div className="skeleton-sub-rating-wrap mt-2 me-2">
            {[1, 2, 3].map((number) => <ResortCardSubRatingSkeleton key={number}/>)}
          </div>
        </div>
      </CCardBody>
      <CCardFooter className="resort-card__footer-wrap pointer-event skeleton-footer">
        <div className="resort-card__expand"/>
      </CCardFooter>
    </CCard>
  </div>
);

export default HomeResortCardSkeleton;
