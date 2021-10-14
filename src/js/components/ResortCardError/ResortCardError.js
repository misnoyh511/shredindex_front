import {
  CCard, CCardBody, CCardHeader,
} from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';

const ResortCardError = ({
  title, help, error, errorInfo,
}) => (
  <div className="resort-card resort-card--error d-flex justify-content-center fade-in">
    <CCard className="resort-card__wrap collapsed">
      <CCardHeader className="resort-card__header-wrap pb-0">
        <div className="total-rating">
          <span className="ps-0 rating__title display-5 text-left mb-2 user-select-none mb-4" color="secondary">
            {title}
          </span>
        </div>
        <div className="mb-4 error-help">
          {help && <span>{help}</span>}
        </div>
      </CCardHeader>
      <CCardBody className="resort-card__body-wrap pt-0 pb-0 mb-3">
        <div className="resort-card__error-details-wrap d-flex mb-2 ps-4 pe-4">
          <div className="resort-card__error-details">
            <div className="resort-card__error-details-title mt-2 mb-2">
              <div className="fw-bold">{error}</div>
              <br />
              <details style={{ whiteSpace: 'pre-wrap' }}>
                {errorInfo}
              </details>
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
);

export default ResortCardError;

ResortCardError.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  errorInfo: PropTypes.string.isRequired,
};
