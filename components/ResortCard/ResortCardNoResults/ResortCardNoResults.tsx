import {
  CButton,
  CCard, CCardBody, CCardHeader,
} from '@coreui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SnowBoarderLost from '../../../images/snowboarder-lost.svg';

interface ResortCardNoResultsProps {
  title: string;
  titleId: string;
  help: string;
  helpId: string;
  suggestion: string;
  suggestionId: string;
  errorMessage: string;
  errorMessageId: string;
}

const ResortCardNoResults: React.FC<ResortCardNoResultsProps> = ({
  title,
  titleId,
  help,
  helpId,
  suggestion,
  suggestionId,
  errorMessage,
  errorMessageId,
}) => (
  <div className="resort-card resort-card--error d-flex justify-content-center fade-in">
    <CCard className="resort-card__wrap collapsed">
      <CCardHeader className="resort-card__header-wrap pb-0">
        <h1 className="fw-bold fs-3">
          <FormattedMessage id={titleId} defaultMessage={title} />
        </h1>
        <div className="mb-4 error-help">
          {help && <p><FormattedMessage id={helpId} defaultMessage={help} /></p>}
        </div>
      </CCardHeader>
      <CCardBody className="resort-card__body-wrap pt-0 pb-0 mb-3">
        <div className="resort-card__error-details-wrap d-flex mb-2 ps-4 pe-4">
          <div className="resort-card__error-details">
            <div className="resort-card__error-details-title mt-2 mb-2">
              <p className="fs-6 fw-light text-break">
                <FormattedMessage id={errorMessageId} defaultMessage={errorMessage} />
              </p>
            </div>
          </div>
        </div>
        <div className="resort-card__suggestion text-center mt-5">
          <p className="fst-italic text-break">
            <FormattedMessage id={suggestionId} defaultMessage={suggestion} />
          </p>
          <div className="d-flex flex-row">
            <CButton href="/" className="me-2 w-100">Go To Home</CButton>
            <CButton href="resorts" color="warning" className="w-100">Reset Filters</CButton>
          </div>
        </div>
      </CCardBody>
      <SnowBoarderLost
        className="resort-card__error-image"
        src={SnowBoarderLost}
        alt="Lost Snowboarder"
        width="100%"
      />
    </CCard>
  </div>
);

export default ResortCardNoResults;
