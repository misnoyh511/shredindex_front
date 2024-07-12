import PropTypes from 'prop-types';
import React from 'react';
import { resortAttributeType } from '../../../types/types';
import Rating from '../../Rating/Rating';

const ResortCardHeader = ({ title, totalScore }) => (
  <div className="resort-card__header mb-3">
    <Rating title={title} rating={totalScore?.value || 'n/a'} ratingType="total-rating" />
  </div>
);

ResortCardHeader.defaultProps = {
  totalScore: {
    value: 'n/a',
  },
};

ResortCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  totalScore: resortAttributeType,
};

export default ResortCardHeader;
