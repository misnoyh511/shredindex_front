import PropTypes from 'prop-types';
import React from 'react';
import CIcon from '@coreui/icons-react';
import getStatisticIcon from '../../hooks/getStatisticIcon';

const Statistic = ({
  title, statistic, statisticType, unit, maxValue,
}) => {
  const [statisticInt, statisticDecimal] = statistic.toString().split('.');
  const isMax = statistic >= 100 || statistic === 'n/a';
  const barWidth = `${(statistic / maxValue) * 100}%`;

  return (
    <>
      <span className="statistic__title display-5 text-left user-select-none" color="secondary">
        {title}
      </span>
      <div className={`statistic statistic--${statisticType}`}>
        <div className="d-flex statistic__number-bar-wrap">
          <div className="statistic__number-border">
            <div className="statistic__border--100 statistic__icon-wrap me-2 d-inline">
              <span
                className={`user-select-none ${isMax ? 'statistic__is-100' : ''}`}
              >
                <CIcon className="statistic__icon" icon={getStatisticIcon(title)} />
              </span>
            </div>
          </div>
          <div className="d-flex align-items-end">
            <span
              className="statistic__number-big display-5 text-left user-select-none"
              color="secondary"
            >
              {statisticInt}
            </span>
            <span className="statistic__number-small strong user-select-none">
              {isMax || `.${statisticDecimal || '0'}`}
            </span>
            <span className="statistic__small-label user-select-none">{unit}</span>
          </div>
        </div>
        <div className="statistic__bar-container">
          <div className="statistic__bar--100 statistic__bar" style={{ width: barWidth }} />
          <div
            className="statistic__bar--100 statistic__bar-indicator"
            style={{ left: barWidth }}
          />
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
  unit: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
};

Statistic.defaultProps = {
  statistic: 0,
  statisticType: 'sub-statistic',
  unit: '',
};

export default Statistic;
