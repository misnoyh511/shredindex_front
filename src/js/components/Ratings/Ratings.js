import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CProgress,
  CRow,
  CListGroup, CListGroupItem,
} from '@coreui/react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Ratings = (props) => {
  const { ratings } = props;
  return (
    <CCard className="resort-rating__card">
      <CCardHeader>
        <FormattedMessage
          className="h6"
          id="shredindex.rating.RATINGS"
          defaultMessage="Ratings"
        />
      </CCardHeader>
      <CCollapse show>
        <CCardBody>
          <CListGroup className="ratings-list">
            {ratings.map(({
              id, title, icon, value,
            }) => (
              <CListGroupItem key={id} className="justify-content-between">
                <CRow>
                  <div className="resort-rating__label col-5">
                    {title}
                  </div>
                  <div className="col-7" content={icon} color="primary">
                    <CProgress
                      color="gradient-warning"
                      value={value}
                      max={100}
                      showPercentage
                      className="resort-rating__value font-weight-bold"
                    />
                  </div>
                </CRow>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCardBody>
      </CCollapse>
    </CCard>
  );
};

const Rating = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

Ratings.propTypes = {
  ratings: PropTypes.arrayOf(Rating).isRequired,
};

export default Ratings;
