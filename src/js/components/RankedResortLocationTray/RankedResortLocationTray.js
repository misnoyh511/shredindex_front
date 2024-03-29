import React from 'react';
import { useRecoilState, atom } from 'recoil';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody, CButton, CRow, CFormLabel,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { NumberParam, withQueryParams } from 'use-query-params';
import { JsonParam } from 'serialize-query-params';
import PropTypes from 'prop-types';
import { currentFilterState } from '../../hooks/useQueryFilters';
import RegionSelect from '../RegionSelect/RegionSelect';

export const showLocationTrayState = atom({
  key: 'showLocationTrayState',
  default: false,
});

const RankedResortLocationTray = ({
  setQuery,
}) => {
  const [visible, setVisible] = useRecoilState(showLocationTrayState);
  const [formData, setFormData] = useRecoilState(currentFilterState);

  const handleClose = () => setVisible(false);

  const onSubmit = () => {
    const activeFilters = formData.groupedType.filter(
      (item) => item.toggleOn,
    ).map((item) => item.filters).flat();
    setQuery({ filters: { groupedType: activeFilters, locationType: formData.locationType }, page: 1 });
    handleClose();
  };

  const resetFilters = () => {
    setQuery({ filters: { groupedType: [], locationType: null }, page: 1 });
    setFormData({ groupedType: [], locationType: null });
  };

  if (!visible) return null;

  return (
    <CModal
      className="location-tray"
      fullscreen="lg"
      scrollable
      visible={visible}
      onClose={handleClose}
    >
      <CModalHeader>
        <CModalTitle className="h4 text-center mx-auto w-100 fw-bold">
          <FormattedMessage
            id="shredindex.filter.LOCATION"
            defaultMessage="Location"
          />
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CFormLabel className="form-label filters__scores">
            <FormattedMessage
              id="shredindex.filter.Region"
              defaultMessage="Region"
            />
          </CFormLabel>
          <div className={'ps-2 pe-2'}>
            <RegionSelect />
          </div>
        </CRow>
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

RankedResortLocationTray.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default withQueryParams({
  filters: JsonParam,
  page: NumberParam,
}, RankedResortLocationTray);
