import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CProgress,
  CRow,
  CListGroup, CListGroupItem,
} from '@coreui/react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Statistics = (props) => {
  const { statistics, generics } = props;
  return (
    <div className="statistics">
      <CCard className="statistics__card mb-4">
        <CCardHeader>
          <FormattedMessage
            className="h6"
            id="shredindex.statistic.STATISTICS"
            defaultMessage="Statistics"
          />
        </CCardHeader>
        <CCardBody>
          <CListGroup>
            {statistics.map(({
              id, title, value,
            }) => (
              <CListGroupItem key={id} className="justify-content-between">
                <CRow>
                  <div className="statistic__label col-5">
                    {title}
                  </div>
                  <div className="col-7 progress-group-bars statistic__value">
                    <CProgress color="success" value={value} />
                  </div>
                </CRow>
              </CListGroupItem>
            ))}
            {generics.map(({
              id, title, value,
            }) => (
              <CListGroupItem key={id} className="justify-content-between">
                <CRow>
                  <div className="generic__label col-5">
                    {title}
                  </div>
                  <div className="col-7" color="primary">
                    <p className="generic__value mb-0">{value}</p>
                  </div>
                </CRow>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCardBody>
      </CCard>
    </div>
  );
};

const StatisticGenericType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
});

Statistics.propTypes = {
  statistics: PropTypes.arrayOf(StatisticGenericType).isRequired,
  generics: PropTypes.arrayOf(StatisticGenericType).isRequired,
};

export default Statistics;
