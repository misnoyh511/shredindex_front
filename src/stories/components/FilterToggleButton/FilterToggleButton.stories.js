import React from 'react';
import {
  CCardHeader, CCol, CRow, CCard, CCardBody, CFormRange, CInputGroup, CFormInput, CFormLabel,
} from '@coreui/react';
import FilterToggleButtonComponent from '../../../js/components/FilterToggleButton/FilterToggleButton';

export default {
  title: 'Shred index/components/Filter Toggle Button',
  component: FilterToggleButtonComponent,
  argTypes: {
    cardState: {
      name: 'Card state',
      options: ['Full', 'Loading', 'Minimal Data', 'No Data'],
      control: { type: 'select' },
    },
  },
};

export const FilterToggleButton = () => (
  <>
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <p>Filter Toggle Button</p>
          </CCardHeader>
          <CCardBody>
            <FilterToggleButtonComponent
              label="Has a terrain park"
              tooltip="Big airs, smooth rails and delicious tricks"
              className="no-child"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <p>
              Filter Toggle Button
              <span className="small">&nbsp; with Children</span>
            </p>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              A form input can be added as a child within the filter button toggle.
            </p>
            <FilterToggleButtonComponent
              label="Snow Quality"
              tooltip="The finest, temperature and lastability of the snow"
              className="with-child"
            >
              <CFormLabel htmlFor="basic-url">Range Slider</CFormLabel>
              <CFormRange steps={10} />
              <CFormLabel htmlFor="basic-url">Text Input</CFormLabel>
              <CInputGroup className="mb-3">
                <CFormInput aria-label="Amount (to the nearest dollar)" />
              </CInputGroup>
            </FilterToggleButtonComponent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </>
);
