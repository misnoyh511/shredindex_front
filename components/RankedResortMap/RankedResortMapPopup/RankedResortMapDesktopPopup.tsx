import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilArrowRight, cilX } from '@coreui/icons';
import RankedResortMapPopupImageCarousel from '@/RankedResortMap/RankedResortMapPopupImageCarousel';
import { Resort } from '../../../types/resortTypes';
import Rating from '@/Rating/Rating';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import ResortCardLocation from '@/ResortCard/ResortCardLocation/ResortCardLocation';

interface DesktopResortPopupProps {
  resort: Resort;
  onClose: () => void;
  cardRef: React.RefObject<HTMLDivElement>;
  isTop: boolean;
}

const RankedResortMapDesktopPopup: React.FC<DesktopResortPopupProps> = ({
  resort,
  onClose,
  cardRef,
  isTop,
}) => {


  return (
    <div className={`resort-popup--desktop ${isTop ? 'top' : 'bottom'}`}>
      <CCard ref={cardRef} className="shadow border-radius-large overflow-hidden mb-0">
        <div className="position-relative">
          <div className="resort-popup__image-carousel">
            <RankedResortMapPopupImageCarousel
              key={resort.id}
              images={resort.resort_images}
            />
          </div>

          <div className="resort-popup--desktop__close-button-wrapper">
            <CButton
              onClick={onClose}
              className="rounded-circle p-1"
              size="sm"
            >
              <CIcon icon={cilX} size="sm" />
            </CButton>
          </div>
        </div>

        <CCardBody className="p-3">
          <header
            className="resort-popup__header mb-2 w-100"
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
          <ResortCardLocation location={resort.location} />
        </CCardBody>

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
      </CCard>
    </div>
  );
};

export default RankedResortMapDesktopPopup;
