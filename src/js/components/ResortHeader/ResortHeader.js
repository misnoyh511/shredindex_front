import React from 'react';
import {
  CCard,
} from '@coreui/react';
import PropTypes from 'prop-types';

const ResortHeader = (props) => {
  const {
    resort: {
      title,
      location: {
        country: {
          name: countryName,
        },
        state,
      },
    },
  } = props;

  return (
    <CCard className="resort-header p-4">
      <h1 className="resort-header__title display-5 text-center" color="secondary">{title}</h1>
      <div className="resort-header__location text-center mb-2">
        {(state && state.name) && <span className="resort-header__state-name">{`${state.name} | `}</span>}
        <span className="resort-header__country-name">{countryName}</span>
      </div>
    </CCard>
  );
};

ResortHeader.propTypes = {
  resort: PropTypes.shape({
    location: {
      country: {
        name: PropTypes.string,
        code: PropTypes.string,
      },
      state: {
        name: PropTypes.string,
        code: PropTypes.string,
      },
    }.isRequired,
    url_segment: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResortHeader;
