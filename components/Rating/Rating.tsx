import React from 'react';
import { CIcon } from '@coreui/icons-react';
import getTypeIcon from '../../hooks/getTypeIcon';
import isNumber from '../../utility/helperFunctions';

interface RatingProps {
  name?: string | null;
  title: string;
  rating?: string | number | 'n/a';
  ratingType?: 'sub-rating' | string;
}

const Rating: React.FC<RatingProps> = ({
  name = null,
  title,
  rating = 0,
  ratingType = 'sub-rating',
}) => {
  let ratingInt: string = '0';
  let ratingDecimal: string = '0';

  if (rating !== 'n/a' && isNumber(rating)) {
    [ratingInt, ratingDecimal] = rating.toFixed(1).toString().split('.');
  } else if (rating === 'n/a') {
    ratingInt = 'n/a';
  }

  const styleSuffix = rating === 'n/a' ? 'na' : Math.ceil(Number(rating) / 20) * 20;
  const isMax = rating === 'n/a' || Number(rating) >= 100;
  const barWidth = rating === 'n/a' ? '0%' : `${rating}%`;

  return (
    <div className={`rating rating--${ratingType}`}>
      <div className="rating__number-border">
        <div className={`rating__border--${styleSuffix} rating__number-wrap me-2 d-inline`}>
          <span
            className={`rating__number-big user-select-none ${isMax ? 'rating__is-100' : ''}`}
          >
            {ratingInt}
          </span>
          {rating !== 'n/a' && (
            <span className="rating__number-small strong user-select-none">
              {isMax || `.${ratingDecimal ? Number(ratingDecimal).toFixed(0) : '0'}`}
            </span>
          )}
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

export default Rating;
