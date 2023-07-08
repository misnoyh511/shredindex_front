import {
  CFormSelect,
  CFormLabel,
  CForm,
} from '@coreui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const RankedResortFilters = () => (
  <CForm>
    <CFormLabel className="form-label">
      <FormattedMessage
        id="shredindex.filter.ORDER_BY"
        defaultMessage="Order By"
      />
    </CFormLabel>
    <CFormSelect
      aria-label={(
        <FormattedMessage
          id="shredindex.filter.ORDER_BY"
          defaultMessage="Order By"
        />
            )}
    />
    <hr className="form-hr" />
    <CFormLabel className="form-label filters__scores">
      <FormattedMessage
        id="shredindex.filter.SCORES"
        defaultMessage="Scores"
      />
    </CFormLabel>
    <hr className="form-hr" />
    <CFormLabel className="form-label filters__stats">
      <FormattedMessage
        id="shredindex.filter.STATS"
        defaultMessage="Stats"
      />
    </CFormLabel>
    <hr className="form-hr" />
    <CFormLabel className="form-label filters__features">
      <FormattedMessage
        id="shredindex.filter.FEATURES"
        defaultMessage="Features"
      />
    </CFormLabel>
  </CForm>
);

export default RankedResortFilters;
