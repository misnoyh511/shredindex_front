import React from 'react';
import {
  CCard,
  CCardFooter,
  CButton, CCardHeader,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import ResortImageLoading from '../../../images/resort-image-placeholder-loading.svg';

interface LoadingPopupProps {
  onClose: () => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

const RankedResortMapMobileLoadingPopup: React.FC<LoadingPopupProps> = ({ onClose, cardRef }) => {
  return (
    <div className="resort-popup--mobile">
      <CCard ref={cardRef} className="shadow border-radius-medium overflow-hidden">
        <div className="resort-popup--mobile__content">
          <div className="resort-popup--mobile__thumbnail-wrapper position-relative">
            <div className="skeleton-image carousel__image-wrapper w-100 h-100">
              <ResortImageLoading/>
            </div>
          </div>

          <div className="resort-popup--mobile__info">
            <div>
            <div className="resort-popup--mobile__header d-flex overflow-hidden me-2 resort-card--skeleton">
                <CCardHeader className="resort-card__header-wrap pb-0 mb-2 w-100">
                  <div className="skeleton-card__header d-flex mb-3">
                    <div className="skeleton-rating-header me-3" />
                    <div className="skeleton-rating-title w-100" />
                  </div>
                  <div className="resort-card__location skeleton-location d-flex mb-2">
                    <div className="resort-card__country-flag-wrap country-flag-wrap me-3 " />
                    <div className="skeleton-location-details w-50" />
                  </div>
                </CCardHeader>
                <CButton
                  onClick={onClose}
                  className="rounded-circle p-1 ms-2"
                  size="sm"
                >
                  <CIcon icon={cilX} size="sm"/>
                </CButton>
              </div>

              {/* Location skeleton */}
              <div className="location me-2 mb-3">
                <div className="skeleton skeleton-text w-48"></div>
              </div>
            </div>

            <CCardFooter className="resort-card__footer-wrap pointer-event skeleton-footer">
              <div className="resort-card__expand" />
            </CCardFooter>
          </div>
        </div>
      </CCard>
    </div>
  );
};

export default RankedResortMapMobileLoadingPopup;
