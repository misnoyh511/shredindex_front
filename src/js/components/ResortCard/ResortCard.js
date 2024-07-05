import {
  CCard, CCardBody, CCardFooter, CCardHeader, CLink,
} from '@coreui/react';
import PropTypes from 'prop-types';
import React from 'react';
import useLocalStorageDrivenBooleanState from '../../hooks/useLocalStorageDrivenBooleanState';
import ResortCardFooter from './ResortCardFooter/ResortCardFooter';
import ResortCardBody from './ResortCardBody/ResortCardBody';
import ResortCardHeader from './ResortCardHeader/ResortCardHeader';

const ResortCard = ({ resortData }) => {
  const [collapsed, setCollapsed] = useLocalStorageDrivenBooleanState('resortCollapsed', resortData.id);

  if (!resortData) {
    throw new Error('Resort failed to load');
  }

  const {
    title, url, url_segment, total_score, affiliate_url,
  } = resortData;

  return (
    <div className="resort-card d-flex justify-content-center">
      <CCard className={`${!collapsed ? 'collapsed' : 'full-expanded'} resort-card__wrap`}>
        <CCardHeader className="resort-card__header-wrap pb-0">
          <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliate_url}>
            <ResortCardHeader title={title} totalScore={total_score} />
          </CLink>
        </CCardHeader>
        <CCardBody className="resort-card__body-wrap pt-0 pb-0">
          <ResortCardBody resort={resortData} collapsed={!collapsed} />
        </CCardBody>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <CCardFooter className="resort-card__footer-wrap pointer-event" onClick={() => setCollapsed(!collapsed)}>
          <ResortCardFooter url={url} urlSegment={url_segment} collapsed={!collapsed} />
        </CCardFooter>
      </CCard>
    </div>
  );
};

ResortCard.propTypes = {
  resortData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    url_segment: PropTypes.string.isRequired,
    total_score: PropTypes.shape({
      value: PropTypes.number.isRequired, // Assuming total_score.value is a number
    }).isRequired,
    affiliate_url: PropTypes.string.isRequired,
  }).isRequired,
};
export default ResortCard;
