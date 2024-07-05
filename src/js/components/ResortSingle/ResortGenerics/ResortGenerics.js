import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CIcon from '@coreui/icons-react';
import { cil3d, cilCheck } from '@coreui/icons';

const ResortGenerics = ({ generics }) => (
  <div className="generics">
    <h4 className="generics-title h5">
      <FormattedMessage
        id="shredindex.generics.FEATURES"
        defaultMessage="Features"
      />
    </h4>
    {generics.map(({
      id,
      title,
      value,
    }) => (
      <div key={id} className="generics-item">
        {value === 'yes'
          ? <CIcon icon={cilCheck} size="md" />
          : <CIcon icon={cil3d} size="md" />}
        <div>
          {title}
        </div>
      </div>
    ))}
  </div>
);

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
