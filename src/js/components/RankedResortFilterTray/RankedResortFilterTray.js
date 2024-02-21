import React, { useState } from 'react';
import { useRecoilState, atom } from 'recoil';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody, CButton,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { withQueryParams } from 'use-query-params';
import { JsonParam } from 'serialize-query-params';
import RankedResortFilters from '../RankedResortFilters/RankedResortFilters';
import { currentFilterState } from '../../hooks/useQueryFilters';


export const showFilterTrayState = atom({
  key: 'showFilterTrayState',
  default: false,
});

const RankedResortFilterTray = ({
  setQuery,
}) => {
  const [visible, setVisible] = useRecoilState(showFilterTrayState);
  const [formData, setFormData] = useRecoilState(currentFilterState);

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  const onSubmit = () => {
    const activeFilters = formData.filter(
      (item) => item.toggleOn,
    ).map((item) => item.filters).flat();
    console.log('activeFilters', activeFilters);
    setQuery({ filters: activeFilters });
  };

  const resetFilters = () => {setQuery({ filters: [] }); setFormData([])}

  return (
    <CModal
      className="filter-tray"
      fullscreen="lg"
      scrollable
      visible={visible}
      onClose={handleClose}
    >
      <CModalHeader>
        <CModalTitle className="h4 text-center mx-auto w-100 fw-bold">
          <FormattedMessage
            id="shredindex.filter.FILTERS"
            defaultMessage="Filters"
          />
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <RankedResortFilters />
      </CModalBody>
      <CModalFooter className="justify-content-between">
        <CButton className="text-white" shape="rounded-pill" color="secondary" onClick={() => { handleClose(); resetFilters(); }}>
          Clear All
        </CButton>
        <CButton className="text-white" shape="rounded-pill" color="warning" onClick={() => { onSubmit(); handleClose(); }}>View</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default withQueryParams({
  filters: JsonParam,
}, RankedResortFilterTray);
