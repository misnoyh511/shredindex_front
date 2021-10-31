import React from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

export default { title: 'CoreUI/Icons' };
const toKebabCase = (str) => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
  .toLowerCase();

const getIconsView = (iconset) => Object.entries(iconset)
  .map(([name, value]) => (
    <CCol className="mb-5" xs="6" sm="4" md="3" xl="2" key={name}>
      <CIcon icon={value} size="xl" />
      <div>{toKebabCase(name)}</div>
    </CCol>
  ));

export const CoreUIIcons = () => (
  <div className="c-main container-fluid">
    <CCard>
      <CCardHeader>
        Free Icons / as CIcon
        {' '}
        <div className="card-header-actions">
          <a
            href="https://github.com/coreui/coreui-icons"
            rel="noreferrer noopener"
            target="_blank"
            className="card-header-action"
          >
            <small className="text-muted">Github</small>
          </a>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow className="text-center">
          {getIconsView(freeSet)}
        </CRow>
      </CCardBody>
    </CCard>
  </div>
);
