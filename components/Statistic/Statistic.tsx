import React, { useEffect, useState } from 'react';
import { TypeIcon } from '@/Icons/TypeIcon';

interface StatisticProps {
  title: string;
  name: string;
  statistic: number | string;
  statisticType?: string;
  unit?: string;
  maxValue: number;
}

const useCountAnimation = (targetValue: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.min(targetValue * progress, targetValue));

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

const Statistic: React.FC<StatisticProps> = ({
  title,
  name,
  statistic,
  statisticType = 'sub-statistic',
  unit = '',
  maxValue,
}) => {
  const [animatedWidth, setAnimatedWidth] = useState('0%');
  const animatedNumber = useCountAnimation(Number(statistic), 200);

  useEffect(() => {
    // Start animation after component mount
    const timer = setTimeout(() => {
      setAnimatedWidth(`${(Number(statistic) / maxValue) * 100}%`);
    }, 50);

    return () => clearTimeout(timer);
  }, [statistic, maxValue]);

  const [statisticInt, statisticDecimal] = animatedNumber.toFixed(1).split('.');
  const isMax = Number(statistic) >= 100 || statistic === 'n/a';
  const statisticId = `statistic-${name?.toLowerCase()}`;

  return (
    <section
      className="statistic-container"
      aria-labelledby={statisticId}
    >
      <h3
        id={statisticId}
        className="statistic__title display-5 text-left user-select-none"
        color="secondary"
      >
        {title}
      </h3>

      <div
        className={`statistic statistic--${statisticType}`}
        role="group"
        aria-labelledby={statisticId}
      >
        <div className="d-flex statistic__number-bar-wrap justify-content-between">
          <div className="statistic__border--100 statistic__icon-wrap me-2 user-select-none">
            <TypeIcon
              className="statistic__icon"
              typeName={name}
              size={'2rem'}
            />
          </div>
          <div
            className="d-flex align-items-end"
            aria-label={`${statistic}${unit ? ` ${unit}` : ''}`}
          >
            <span
              className="statistic__number-big display-5 text-left user-select-none"
              color="secondary"
            >
              {statisticInt}
            </span>
            {unit !== 'total' && (
              <span className="statistic__number-small strong user-select-none">
                {isMax || `.${statisticDecimal || '0'}`}
              </span>
            )}
            <span
              className="statistic__small-label user-select-none"
              aria-hidden="true"
            >
              {unit}
            </span>
          </div>
        </div>

        <div
          className="statistic__bar-container"
          role="progressbar"
          aria-valuenow={Number(statistic)}
          aria-valuemin={0}
          aria-valuemax={maxValue}
          aria-label={`Progress for ${title}`}
        >
          <div
            className="statistic__bar--100 statistic__bar"
            style={{
              width: animatedWidth,
              transition: 'width 200ms ease-out',
            }}
            aria-hidden="true"
          />
          <div
            className="statistic__bar--100 statistic__bar-indicator"
            style={{
              left: animatedWidth,
              transition: 'left 200ms ease-out',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Statistic;
