import PropTypes from 'prop-types';
import React from 'react';
import { resortAttributeType } from '../../types/types';
import Rating from '../Rating/Rating';

const ResortCardHeader = ({ title, totalScore }) => {
  const score = totalScore ? totalScore.value : 'n/a';

  return (
    <div className="resort-card__header mb-3">
      <Rating title={title} rating={score} ratingType="total-rating" />
    </div>
  );
};

ResortCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  totalScore: resortAttributeType.isRequired,
};

export default ResortCardHeader;
