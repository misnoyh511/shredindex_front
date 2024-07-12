import {
  CCard, CCardBody, CCardFooter, CCardHeader, CLink,
} from '@coreui/react';
import PropTypes, { arrayOf } from 'prop-types';
import React from 'react';
import ResortCardHeader from '../ResortCard/ResortCardHeader/ResortCardHeader';
import ResortImageCarousel from '../ResortCard/ResortCardImageCarousel/ResortCardImageCarousel';
import { imageType } from '../../types/types';
import ResortCardFooter from '../ResortCard/ResortCardFooter/ResortCardFooter';
import useLocalStorageDrivenBooleanState from '../../hooks/useLocalStorageDrivenBooleanState';
import ResortCardBodyHome from './ResortCardBodyHome';

const ResortCardHome = ({ resortData }) => {
  const [collapsed, setCollapsed] = useLocalStorageDrivenBooleanState('resortCollapsed', resortData.id);

  if (!resortData) {
    throw new Error('Resort failed to load');
  }

  const {
    title, total_score, url, affiliate_url, resort_images,
  } = resortData;

  return (
    <div className="resort-card resort-card-mini d-flex justify-content-center">
      <CCard className="full-expanded resort-card__wrap">
        <div>
          <ResortImageCarousel images={resort_images} showOneImage />
        </div>
        <CCardHeader className="resort-card__header-wrap pb-0">
          <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliate_url}>
            <ResortCardHeader title={title} totalScore={total_score} />
          </CLink>
        </CCardHeader>
        <CCardBody className="resort-card__body-wrap pt-0 pb-0">
          <ResortCardBodyHome resort={resortData} collapsed={!collapsed} />
        </CCardBody>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <CCardFooter className="resort-card__footer-wrap pointer-event" onClick={() => setCollapsed(!collapsed)}>
          <ResortCardFooter url={url} urlSegment={url} noCollapse />
        </CCardFooter>
      </CCard>
    </div>
  );
};

ResortCardHome.propTypes = {
  resortData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    url_segment: PropTypes.string.isRequired,
    resort_images: arrayOf(imageType).isRequired,
    total_score: PropTypes.shape({
      value: PropTypes.number.isRequired, // Assuming total_score.value is a number
    }).isRequired,
    affiliate_url: PropTypes.string.isRequired,
  }).isRequired,
};
export default ResortCardHome;
