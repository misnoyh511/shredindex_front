import PropTypes from 'prop-types';
import React from 'react';
import CIcon from '@coreui/icons-react';
import getTypeIcon from '../../hooks/getTypeIcon';

const Rating = ({
  name, title, rating, ratingType,
}) => {
  const [ratingInt, ratingDecimal] = rating.toString().split('.');
  const styleSuffix = rating === 'n/a' ? 'na' : Math.ceil(rating / 20) * 20;
  const isMax = rating >= 100 || rating === 'n/a';
  const barWidth = `${rating}%`;

  return (
    <div className={`rating rating--${ratingType}`}>
      <div className="rating__number-border">
        <div className={`rating__border--${styleSuffix} rating__number-wrap me-2 d-inline`}>
          <span
            className={`rating__number-big user-select-none ${isMax ? 'rating__is-100' : ''}`}
          >
            {ratingInt}
          </span>
          <span className="rating__number-small strong user-select-none">
            {isMax || `.${ratingDecimal ? Number(ratingDecimal).toFixed(0) : '0'}`}
          </span>
        </div>
      </div>
      <div className="rating__icon-label-wrap">
        <span className={`rating__icon--${styleSuffix} user-select-none`}>
          {name && ratingType === 'sub-rating' && (
            <CIcon
              className="rating__icon"
              icon={getTypeIcon(name)}
            />
          )}
        </span>
        <span className="rating__title display-5 text-left user-select-none">
          {title}
        </span>
      </div>
      <div className="rating__bar-container">
        <div className={`rating__bar--${styleSuffix} rating__bar`} style={{ width: barWidth }} />
        <div
          className={`rating__bar--${styleSuffix} rating__bar-indicator`}
          style={{ left: barWidth }}
        />
      </div>
    </div>
  );
};

Rating.defaultProps = {
  rating: 0,
  ratingType: 'sub-rating',
  name: null,
};

Rating.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  ratingType: PropTypes.string,
};

export default Rating;
