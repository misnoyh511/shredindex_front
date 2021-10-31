import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CProgress,
  CListGroup,
} from '@coreui/react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Ratings = (props) => {
  const { ratings } = props;

  return (
    <CCard className="resort-rating__card mb-4">
      <CCardHeader>
        <FormattedMessage
          className="h6"
          id="shredindex.rating.RATINGS"
          defaultMessage="Ratings"
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
                  {value}
                  %
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
