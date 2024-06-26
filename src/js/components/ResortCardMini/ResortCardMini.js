import {
  CCard, CCardBody, CCardHeader, CLink,
} from '@coreui/react';
import PropTypes, { arrayOf } from 'prop-types';
import React from 'react';
import useLocalStorageDrivenBooleanState from '../../hooks/useLocalStorageDrivenBooleanState';
import ResortCardHeader from '../ResortCardHeader/ResortCardHeader';
import ResortImageCarousel from '../ResortCardImageCarousel/ResortImageCarousel';
import ResortCardBodyMini from '../ResortCardBody/ResortCardBodyMini';
import { imageType } from '../../types/types';

const ResortCardMini = ({ resortData }) => {
  const [collapsed, setCollapsed] = useLocalStorageDrivenBooleanState('resortCollapsed', resortData.id);

  if (!resortData) {
    throw new Error('Resort failed to load');
  }

  const {
    title, total_score, affiliate_url, resort_images,
  } = resortData;

  return (
    <div className="resort-card resort-card-mini d-flex justify-content-center">
      <CCard className="full-expanded resort-card__wrap">
        <div>
          <ResortImageCarousel images={resort_images} />
        </div>
        <CCardHeader className="resort-card__header-wrap pb-0">
          <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliate_url}>
            <ResortCardHeader title={title} totalScore={total_score} />
          </CLink>
        </CCardHeader>
        <CCardBody className="resort-card__body-wrap pt-0 pb-0">
          <ResortCardBodyMini resort={resortData} collapsed={!collapsed} />
        </CCardBody>
      </CCard>
    </div>
  );
};

ResortCardMini.propTypes = {
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
export default ResortCardMini;
