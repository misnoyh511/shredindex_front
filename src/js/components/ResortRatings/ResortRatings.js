import {
  CCard, CCardBody, CCardHeader, CCol, CListGroup, CRow,
} from '@coreui/react';

import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { resortAttributeType } from '../../types/types';
import Rating from '../Rating/Rating';

const ResortRatings = ({ ratings }) => {

  const ratingsColumn1 = ratings.filter((_, index) => index % 2 === 0);
  const ratingsColumn2 = ratings.filter((_, index) => index % 2 !== 0);

  return (

    <CCard className="resort-rating__card resort-ratings mb-4">
      <CCardHeader>
        <h3>
          <FormattedMessage
            id="shredindex.rating.RATINGS"
            defaultMessage="Resort ratings"
          />
        </h3>
      </CCardHeader>
      <CCardBody>
        <CListGroup className="ratings-list">
          <CRow>
            <CCol xxl={6} xl={6}>
              {ratingsColumn1.map(({
                id,
                title,
                name,
                value
              }) => (
                <div key={id} className="rating-list__rating mb-3">
                  <Rating title={title} rating={value} name={name} />
                </div>
              ))}
            </CCol>
            <CCol xxl={6} xl={6}>
              {ratingsColumn2.map(({
                id,
                title,
                name,
                value
              }) => (
                <div key={id} className="rating-list__rating mb-3">
                  <Rating title={title} rating={value} name={name} />
                </div>
              ))}
            </CCol>
          </CRow>
        </CListGroup>
      </CCardBody>
    </CCard>
  );
};
ResortRatings.propTypes = {
  ratings: PropTypes.arrayOf(resortAttributeType).isRequired,
};

export default ResortRatings;
