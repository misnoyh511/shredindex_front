import React from 'react';
import {
  CButton,
  CCard, CCardFooter,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilArrowRight, cilX } from '@coreui/icons';
import RankedResortMapPopupImageCarousel from '@/RankedResortMap/RankedResortMapPopupImageCarousel';
import { Resort } from '../../../types/resortTypes';
import Rating from '@/Rating/Rating';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import ResortCardLocation from '@/ResortCard/ResortCardLocation/ResortCardLocation';
import ResortCardKeyInsight from '@/ResortCardKeyInsight/ResortCardKeyInsight';

interface MobileResortPopupProps {
  resort: Resort;
  onClose: () => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

const RankedResortMapMobilePopup: React.FC<MobileResortPopupProps> = ({ resort, onClose, cardRef }) => {
  return (
    <div className="resort-popup--mobile">
      <CCard ref={cardRef} className="shadow border-radius-medium overflow-hidden">
        <div className="resort-popup--mobile__content">
          <div className="resort-popup--mobile__thumbnail-wrapper position-relative">
            <RankedResortMapPopupImageCarousel
              key={resort.id}
              images={resort.resort_images}
            />
          </div>

          <div className="resort-popup--mobile__info">
            <div>
              <div className="resort-popup--mobile__header d-flex overflow-hidden me-2">
                <header
                  className="header resort-popup__header mb-1"
                  role="banner"
                >
                  <Rating
                    title={resort.title}
                    rating={resort.total_score?.value || 'n/a'}
                    ratingType="total-rating"
                    headingLevel="h5"
                    aria-label={`Rating for ${resort.title}`}
                  />
                </header>
                <CButton
                  onClick={onClose}
                  className="rounded-circle p-1 ms-2"
                  size="sm"
                >
                  <CIcon icon={cilX} size="sm"/>
                </CButton>
              </div>
              <div className="location me-2">
                <ResortCardLocation location={resort.location} />
              </div>
              {resort.keyInsight && (
                <ResortCardKeyInsight key={'keyInsight'} keyInsight={resort.keyInsight} />
              )}
            </div>

            <CCardFooter className="border-0 p-0 pe-3 position-relative overflow-hidden">
              <div className="resort-card full-expanded">
                <Link
                  href={`/resort/${resort.url_segment}`}
                  className="resort-card__resort-link"
                >
                  <div className="resort-card__go-to-resort-button">
            <span className="resort-card__go-to-resort-text me-2 user-select-none">
            <FormattedMessage id="shredindex.resortcard.GO_TO_RESORT" defaultMessage="Go to ResortSingle" />
            </span>
                    <CIcon icon={cilArrowRight} />
                  </div>
                </Link>
              </div>
            </CCardFooter>
          </div>
        </div>
      </CCard>
    </div>
  );
};

export default RankedResortMapMobilePopup;
