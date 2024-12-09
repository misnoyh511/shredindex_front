import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import SnowBoarderLost from '../images/snowboarder-lost.svg';

interface NotFoundProps {
  title?: string;
  titleId?: string;
  help?: string;
  helpId?: string;
  suggestion?: string;
  suggestionId?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  title = '404 - Out of bounds',
  titleId = 'page.notFound.title',
  help = "Looks like you've ducked the rope!",
  helpId = 'page.notFound.help',
  suggestion = "Let's get you back on the slopes.",
  suggestionId = 'page.notFound.suggestion',
}) => {
  const router = useRouter();

  return (
    <div className="resort-card resort-card--error d-flex justify-content-center fade-in mt-4">
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
            <div className="resort-card__error-details w-100">
              <div className="resort-card__error-details-title mt-2 mb-2">
                <CListGroup className="mt-3" flush>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span className="fw-light">Current Path:</span>
                    <span className="text-muted">{router.asPath}</span>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span className="fw-light">Status:</span>
                    <span className="text-danger">404 Not Found</span>
                  </CListGroupItem>
                </CListGroup>
              </div>
            </div>
          </div>

          <div className="resort-card__suggestion text-center mt-5">
            <p className="fst-italic text-break">
              <FormattedMessage id={suggestionId} defaultMessage={suggestion} />
            </p>
            <div className="d-flex flex-row">
              <CButton color="info" href="/" className="me-2 w-100">
                Back to Base
              </CButton>
              <CButton
                color="primary"
                className="w-100"
                onClick={() => router.back()}
              >
                Previous Run
              </CButton>
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
};

export default NotFound;
