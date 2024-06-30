import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup, CListGroupItem,
} from '@coreui/react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Statistic from '../Statistic/Statistic';
import getUnit from '../../hooks/getUnit';

const ResortGenerics = ({generics}) => {
  return (
    <div className="statistics">
      <CCard className="statistics__card mb-4">
        <CCardHeader>
          <h3>
            <FormattedMessage
              id="shredindex.statistic.STATISTICS"
              defaultMessage="Features"
            />
          </h3>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xxl={6} xl={6}>
              <div className="numeric-list">
                <div className="numeric-list__list">
                  {generics.map(({
                    id,
                    title,
                    value,
                  }) => (
                    <CRow key={id}>
                      <div className="generic__label col-5">
                        {title}
                      </div>
                      <div className="col-7" color="primary">
                        <p className="generic__value mb-0">{value}</p>
                      </div>
                    </CRow>
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

ResortGenerics.propTypes = {
  generics: PropTypes.arrayOf(StatisticGenericType).isRequired,
};

export default ResortGenerics;
