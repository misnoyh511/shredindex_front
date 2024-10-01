import React from 'react';
import { CIcon } from '@coreui/icons-react';
import getTypeIcon from '../../hooks/getTypeIcon';

interface StatisticProps {
  title: string;
  name: string;
  statistic: number | string;
  statisticType?: string;
  unit?: string;
  maxValue: number;
}

const Statistic: React.FC<StatisticProps> = ({
  title,
  name,
  statistic,
  statisticType = 'sub-statistic',
  unit = '',
  maxValue,
}) => {
  const [statisticInt, statisticDecimal] = statistic.toString().split('.');
  const isMax = Number(statistic) >= 100 || statistic === 'n/a';
  const barWidth = `${(Number(statistic) / maxValue) * 100}%`;

  return (
    <>
      <span className="statistic__title display-5 text-left user-select-none text-end" color="secondary">
        {title}
      </span>
      <div className={`statistic statistic--${statisticType}`}>
        <div className="d-flex statistic__number-bar-wrap justify-content-between">
          <div className="statistic__number-border">
            <div className="statistic__border--100 statistic__icon-wrap me-2 d-inline">
              <span
                className={`user-select-none ${isMax ? 'statistic__is-100' : ''}`}
              >
                <CIcon className="statistic__icon" icon={getTypeIcon(name)} />
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
            {unit !== 'total' && (
              <span className="statistic__number-small strong user-select-none">
                {isMax || `.${statisticDecimal || '0'}`}
              </span>
            )}
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

export default Statistic;
