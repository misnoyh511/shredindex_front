import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Statistic from '../Statistic/Statistic';
import getUnit from '../../hooks/getUnit';

const ResortNumerics = ({statistics}) => {
  return (
    <div className="statistics">
      <CCard className="statistics__card mb-4">
        <CCardHeader>
          <h3>
            <FormattedMessage
              id="shredindex.statistic.STATISTICS"
              defaultMessage="Statistics"
            />
          </h3>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xxl={6} xl={6}>
              <div className="numeric-list">
                <div className="numeric-list__list">
                  {statistics.map(({
                    id,
                    title,
                    value,
                    name,
                    type,
                  }) => (
                    <div key={id} className="numeric-list__numeric mb-3 me-1 w-100">
                      <Statistic
                        title={title}
                        name={name}
                        statistic={value}
                        maxValue={type.max_value}
                        unit={getUnit({ unit: type.unit })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CCol>
          </CRow>
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

ResortNumerics.propTypes = {
  statistics: PropTypes.arrayOf(StatisticGenericType).isRequired,
};

export default ResortNumerics;
