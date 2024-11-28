import React from 'react';
import isNumber from '../../utils/helperFunctions';
import { TypeIcon } from '@/Icons/TypeIcon';

interface RatingProps {
  name?: string | null;
  title: string;
  rating?: string | number | 'n/a';
  ratingType?: 'sub-rating' | string;
  headingId?: string;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | null;
}

const Rating: React.FC<RatingProps> = ({
  name = null,
  title,
  rating = 0,
  ratingType = 'sub-rating',
  headingId,
  headingLevel = null,
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
  const ratingId = headingId || `rating-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const ratingValue = rating === 'n/a' ? 'Not available' : `${rating}%`;

  const renderTitle = () => {
    const titleClasses = 'rating__title display-5 text-left user-select-none';

    if (headingLevel && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(headingLevel)) {
      const HeadingTag = headingLevel;
      return (
        <HeadingTag id={ratingId} className={titleClasses}>
          {title}
        </HeadingTag>
      );
    }

    return (
      <span id={ratingId} className={titleClasses}>
        {title}
      </span>
    );
  };

  return (
    <div
      className={`rating rating--${ratingType}`}
      role="group"
      aria-labelledby={ratingId}
    >
      <div
        className="rating__number-border"
        role="text"
        aria-label={`Rating value: ${ratingValue}`}
      >
        <div className={`rating__border--${styleSuffix} rating__number-wrap me-2 d-inline`}>
          <span
            className={`rating__number-big user-select-none ${isMax ? 'rating__is-100' : ''}`}
            aria-hidden="true"
          >
            {ratingInt}
          </span>
          {rating !== 'n/a' && (
            <span
              className="rating__number-small strong user-select-none"
              aria-hidden="true"
            >
              {isMax || `.${ratingDecimal ? Number(ratingDecimal).toFixed(0) : '0'}`}
            </span>
          )}
        </div>
      </div>
      <div
        className="rating__icon-label-wrap"
        role="presentation"
      >
        <span
          className={`rating__icon--${styleSuffix} user-select-none rating__type`}
          aria-hidden="true"
        >
          {name && ratingType === 'sub-rating' && (
            <TypeIcon className="rating__icon" typeName={name} size={'1.45rem'}/>
          )}
        </span>
        {renderTitle()}
      </div>
      <div
        className="rating__bar-container"
        role="progressbar"
        aria-valuenow={rating === 'n/a' ? 0 : Number(rating)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${title} rating progress`}
      >
        <div
          className={`rating__bar--${styleSuffix} rating__bar`}
          style={{ width: barWidth }}
          aria-hidden="true"
        />
        <div
          className={`rating__bar--${styleSuffix} rating__bar-indicator`}
          style={{ left: barWidth }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Rating;
