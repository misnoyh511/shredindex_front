import React from 'react';
import {
  CCard, CCardBody, CCardHeader, CLink,
} from '@coreui/react';
import PropTypes from 'prop-types';
import CIcon from '@coreui/icons-react';
import { cilShareAlt } from '@coreui/icons';
import ResortCardHeader from '../../ResortCard/ResortCardHeader/ResortCardHeader';
import ResortCardLocation from '../../ResortCard/ResortCardLocation/ResortCardLocation';

const ResortHeader = ({ resort }) => {
  const {
    title,
    affiliate_url,
    total_score,
    location,
    description,
  } = resort;

  return (
    <CCard className="resort-header pt-2 mb-4">
      <CCardHeader className="resort-card__header-wrap pb-0">
        <CLink
          className="resort-card__affiliate-link link-unstyled"
          rel="noreferrer noopener"
          target="_blank"
          href={affiliate_url}
        >
          <ResortCardHeader title={title} totalScore={total_score} />
        </CLink>
      </CCardHeader>
      <CCardBody>
        <div className="resort-card__content-0 w-100 d-inline-flex justify-content-between">
          <div className="resort-card__location-wrap">
            <div className="resort-card__location text-left d-inline-flex user-select-none">
              <CLink
                className="resort-card__affiliate-link link-unstyled"
                rel="noreferrer noopener"
                target="_blank"
                href={affiliate_url}
              >
                <ResortCardLocation location={location} />
              </CLink>
            </div>
            {description && (
              <div className="resort-card__description-single-resort mb-3 me-2 user-select-none">
                <CLink
                  className="resort-card__affiliate-link link-unstyled"
                  rel="noreferrer noopener"
                  target="_blank"
                  href={affiliate_url}
                >
                  <span className="m-0">
                    {description}
                  </span>
                </CLink>
              </div>
            )}
          </div>
          <div className="resort-card__share-wrap me-2">
            <CIcon icon={cilShareAlt} />
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

ResortHeader.propTypes = {
  resort: PropTypes.shape({
    title: PropTypes.string.isRequired,
    affiliate_url: PropTypes.string.isRequired,
    total_score: PropTypes.number.isRequired,
    location: PropTypes.shape({
      country: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
      }),
      state: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
      }),
    }).isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default ResortHeader;
