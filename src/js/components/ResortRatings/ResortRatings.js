import {
  CCard, CCardBody, CCardHeader, CListGroup, CProgress,
} from '@coreui/react';

import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { resortAttributeType } from '../../types/types';

const ResortRatings = ({ ratings }) => (
  <CCard className="resort-rating__card resort-ratings mb-4">
    <CCardHeader>
      <FormattedMessage
        className="h6"
        id="shredindex.rating.RATINGS"
        defaultMessage="Resort ratings"
      />
    </CCardHeader>
    <CCardBody>
      <CListGroup className="ratings-list">
        {ratings.map(({
          id, title, value,
        }) => (
          <div className="progress-group" key={id}>
            <div className="progress-group-header">
              <span className="resort-rating__label">{title}</span>
              <span className="ms-auto fw-semibold">
                {`${value}%`}
              </span>
            </div>
            <div className="rating__value progress-group-bars">
              <CProgress thin color="success" value={value} />
            </div>
          </div>
        ))}
      </CListGroup>
    </CCardBody>
  </CCard>
);

ResortRatings.propTypes = {
  ratings: PropTypes.arrayOf(resortAttributeType).isRequired,
};

export default ResortRatings;
