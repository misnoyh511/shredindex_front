import {
  CCard, CCardBody, CCardFooter, CCardHeader, CImage,
} from '@coreui/react';
import React from 'react';
import NoResort from '../../../images/resort-image-placeholder.svg';
import ResortCardSubRatingSkeleton from './ResortCardSubRatingSkeleton';
import NumericList from '../NumericList/NumericList';
import Statistic from '../Statistic/Statistic';
import getUnit from '../../hooks/getUnit';
import StatisticSkeleton from '../Statistic/StatisticSkeleton';

const ResortCardSkeleton = () => (
  <div className="resort-card resort-card--skeleton d-flex justify-content-center fade-in">
    <CCard className="resort-card__wrap collapsed">
      <CCardHeader className="resort-card__header-wrap pb-0 mb-2">
        <div className="skeleton-card__header d-flex mb-3">
          <div className="skeleton-rating-header me-3" />
          <div className="skeleton-rating-title w-100" />
        </div>
        <div className="resort-card__location skeleton-location d-flex mb-2">
          <div className="resort-card__country-flag-wrap country-flag-wrap me-3 " />
          <div className="skeleton-location-details w-50" />
        </div>
      </CCardHeader>
      <CCardBody className="resort-card__body pt-0 pb-0 mb-3">
        <div className="resort-card__content-1 mb-2 d-flex">
          <div className="w-100 d-flex gap-3">
            {[1, 2, 3, 4 ,5].map((number) => (
              <div className="w-25">
                <StatisticSkeleton />
              </div>
            ))}
          </div>
        </div>
        <div className="skeleton-content-wrap d-flex mb-2">
          <div className="skeleton-sub-rating-wrap mt-2 me-2">
            {[1, 2, 3].map((number) => <ResortCardSubRatingSkeleton key={number}/>)}
          </div>
          <div className="skeleton-image mb-2 ms-2">
          <CImage src={NoResort} />
          </div>
        </div>
      </CCardBody>
      <CCardFooter className="resort-card__footer-wrap pointer-event skeleton-footer">
        <div className="resort-card__expand" />
      </CCardFooter>
    </CCard>
  </div>
);

export default ResortCardSkeleton;
