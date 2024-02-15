import PropTypes from 'prop-types';
import React from 'react';

const Statistic = ({ title, statistic, statisticType, unit }) => {
  const [statisticInt, statisticDecimal] = statistic.toString().split('.');
  const styleSuffix = statistic === 'n/a' ? 'na' : Math.ceil(statistic / 20) * 20;
  const isMax = statistic >= 100 || statistic === 'n/a';
  const barWidth = `${statistic}%`;

  return (
    <>
      <span className="statistic__title display-5 text-left user-select-none" color="secondary">
        {title}
      </span>
      <div className={`statistic statistic--${statisticType}`}>
        <div className="statistic__number-border">
          <div className={`statistic__border--${styleSuffix} statistic__number-wrap me-2 d-inline`}>
          <span
            className={`statistic__number-big user-select-none ${isMax ? 'statistic__is-100' : ''}`}>{statisticInt}</span>
            <span className="statistic__number-small strong user-select-none">
            {isMax || `.${statisticDecimal || '0'}`}
          </span>
          </div>
        </div>
        <span className="statistic__int display-5 text-left mb-2 user-select-none" color="secondary">
        {statisticInt}
          <span className="statistic__small-label user-select-none">{' m'}</span>
      </span>
        <div className="statistic__bar-container">
          <div className={`statistic__bar--${styleSuffix} statistic__bar`} style={{ width: barWidth }}/>
          <div className={`statistic__bar--${styleSuffix} statistic__bar-indicator`}
               style={{ left: barWidth }}/>
        </div>
      </div>
    </>
  );
};

Statistic.defaultProps = {
  statistic: 0,
  statisticType: 'sub-statistic',
};

Statistic.propTypes = {
  title: PropTypes.string.isRequired,
  statistic: PropTypes.number,
  statisticType: PropTypes.string,
};

export default Statistic;
