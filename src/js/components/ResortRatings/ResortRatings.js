import {
  CCard, CCardBody, CCardHeader, CCol, CListGroup, CProgress, CRow,
} from '@coreui/react';

import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { resortAttributeType } from '../../types/types';
import Rating from '../Rating/Rating';

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
        <CRow>
          <CCol xxl={6} xl={6}>
            {ratings.map(({ id, title, value }) => (
              <div key={id} className="rating-list__rating mb-3 me-1">
                <Rating title={title} rating={value} />
              </div>
            ))}
          </CCol>
        </CRow>
      </CListGroup>
    </CCardBody>
  </CCard>
);

ResortRatings.propTypes = {
  ratings: PropTypes.arrayOf(resortAttributeType).isRequired,
};

export default ResortRatings;
