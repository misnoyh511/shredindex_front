import React from 'react';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSettings } from '@coreui/icons';

const FilterMenu = () => (
  <div className="filter-resorts mb-4 d-flex flex-row">
    <CButton color="primary" className="me-2 w-100">Lifestyles</CButton>
    <CButton color="light" className="ms-2 w-100">
      <CIcon icon={cilSettings} />
      &nbsp; Filters
    </CButton>
  </div>
);

export default FilterMenu;
