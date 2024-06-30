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
import CIcon from '@coreui/icons-react';
import { cil3d, cilCheck } from '@coreui/icons';

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
            {generics.map(({
              id,
              title,
              value,
            }) => (
              <CRow>
                <CCol key={id} xxl={1} xl={1}>
                  {value === 'yes' ? <CIcon icon={cilCheck} size="md" /> : <CIcon icon={cil3d} size="md" />}
                </CCol>
                <CCol key={id} xxl={11} xl={11}>
                  {title}
                </CCol>
              </CRow>
            ))}
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
