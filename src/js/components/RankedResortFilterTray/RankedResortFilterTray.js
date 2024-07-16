import React from 'react';
import { useRecoilState, atom } from 'recoil';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody, CButton,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { NumberParam, withQueryParams } from 'use-query-params';
import { JsonParam } from 'serialize-query-params';
import PropTypes from 'prop-types';
import RankedResortFilters from '../RankedResortFilters/RankedResortFilters';
import { currentFilterState } from '../../hooks/useQueryTypes';

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

  const onSubmit = () => {
    const activeFilters = formData.groupedType.filter(
      (item) => item.toggleOn,
    ).map((item) => item.filters.map(filter => ({
      ...filter,
      value: String(filter.value) // Convert value to string
    }))).flat();
    setQuery({
      filters: {
        groupedType: activeFilters,
        locationType: formData.locationType,
      },
      page: 1,
    });
    handleClose();
  };

  const resetFilters = () => {
    const noFilters = [];
    setQuery({ filters: { groupedType: noFilters, locationType: null }, page: 1 });
    setFormData({ groupedType: noFilters, locationType: null });
  };

  const handleScroll = (event) => {
    localStorage.setItem('filterTrayScroll', event.target.scrollTop);
  };

  const setInitialScroll = (ref) => {
    if (ref) {
      const savedPosition = localStorage.getItem('filterTrayScroll');
      if (savedPosition) {
        // eslint-disable-next-line no-param-reassign
        ref.scrollTop = parseInt(savedPosition, 10);
      }
    }
  };

  if (!visible) return null;

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
      <CModalBody
        onScroll={handleScroll}
        ref={setInitialScroll}
      >
        <RankedResortFilters />
      </CModalBody>
      <CModalFooter className="justify-content-between">
        <CButton className="text-white" shape="rounded-pill" color="secondary" onClick={() => { resetFilters(); }}>
          Clear All
        </CButton>
        <CButton className="text-white" shape="rounded-pill" color="warning" onClick={() => { onSubmit(); }}>View</CButton>
      </CModalFooter>
    </CModal>
  );
};

RankedResortFilterTray.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default withQueryParams({
  filters: JsonParam,
  page: NumberParam,
}, RankedResortFilterTray);
