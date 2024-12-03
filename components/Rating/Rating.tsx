import React, { useEffect, useState } from 'react';
import isNumber from '../../utils/helperFunctions';
import { TypeIcon } from '@/Icons/TypeIcon';

interface RatingProps {
  name?: string | null;
  title: string;
  rating?: string | number | 'n/a';
  ratingType?: 'sub-rating' | string;
  headingId?: string;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | null;
  error?: boolean;
  warningCodes?: string[];
}

const useCountAnimation = (targetValue: number | string | 'n/a', duration: number = 200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (targetValue === 'n/a' || !isNumber(targetValue)) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrameId: number;
    const targetNumber = Number(targetValue);

    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.min(targetNumber * progress, targetNumber));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, duration]);

  return count;
};

const Rating: React.FC<RatingProps> = ({
  name = null,
  title,
  rating = 0,
  ratingType = 'sub-rating',
  headingId,
  headingLevel = null,
  error = false,
  warningCodes = [],
}) => {
  const [animatedWidth, setAnimatedWidth] = useState('0%');
  const animatedValue = useCountAnimation(rating);

  useEffect(() => {
    // Start animation after component mount
    const timer = setTimeout(() => {
      setAnimatedWidth(rating === 'n/a' ? '0%' : `${rating}%`);
    }, 50);

    return () => clearTimeout(timer);
  }, [rating]);

  let ratingInt = '0';
  let ratingDecimal = '0';

  if (rating !== 'n/a' && isNumber(rating)) {
    [ratingInt, ratingDecimal] = animatedValue.toFixed(1).toString().split('.');
  } else if (rating === 'n/a') {
    ratingInt = 'n/a';
  }

  const styleSuffix = rating === 'n/a' ? 'na' : Math.ceil(Number(rating) / 20) * 20;
  const isMax = rating === 'n/a' || Number(rating) >= 100;
  const ratingId = headingId || `rating-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const ratingValue = rating === 'n/a' ? 'Not available' : `${rating}%`;
  const hasWarnings = warningCodes && warningCodes.length > 0;

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

  const getRatingClasses = () => {
    let classes = `rating rating--${ratingType}`;
    if (error) classes += ' rating--error';
    if (hasWarnings) classes += ' rating--warning';
    return classes;
  };

  return (
    <div
      className={getRatingClasses()}
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
          style={{
            width: animatedWidth,
            transition: 'width 200ms ease-out',
          }}
          aria-hidden="true"
        />
        <div
          className={`rating__bar--${styleSuffix} rating__bar-indicator`}
          style={{
            left: animatedWidth,
            transition: 'left 200ms ease-out',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Rating;
