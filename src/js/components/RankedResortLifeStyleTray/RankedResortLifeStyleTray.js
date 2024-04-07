import {
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton,
} from '@coreui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { atom, useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { NumberParam, withQueryParams } from 'use-query-params';
import { JsonParam } from 'serialize-query-params';
import RankedResortLifeStyles from './RankedResortLifeStyles/RankedResortLifeStyles';
import { currentOrderByState } from '../../hooks/useQueryOrderBy';

export const showLifestyleTrayState = atom({
  key: 'showLifestyleTrayState',
  default: false,
});

const RankedResortLifeStyleTray = ({
  setQuery,
}) => {
  const [visible, setVisible] = useRecoilState(showLifestyleTrayState);
  const [formData, setFormData] = useRecoilState(currentOrderByState);

  const handleClose = () => {
    setVisible(false);
  };

  const onSubmit = () => {
    const activeSortby = formData;
    setQuery({ orderBy: activeSortby, page: 1 });
    handleClose();
  };

  const resetOrderBy = () => {
    const defaultOrder = {
      type_name: 'total_score',
      direction: 'desc',
    };
    setFormData(defaultOrder);
    setQuery({ orderBy: defaultOrder, page: 1 });
    handleClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <CModal
      className="lifestyle-tray"
      fullscreen="lg"
      scrollable
      visible={visible}
      onClose={() => handleClose()}
    >
      <CModalHeader>
        <CModalTitle className="h4 text-center mx-auto w-100 fw-bold">
          <FormattedMessage
            id="shredindex.filter.SORTING"
            defaultMessage="Sorting"
          />
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <RankedResortLifeStyles />
      </CModalBody>
      <CModalFooter className="justify-content-between">
        <CButton className="text-white" shape="rounded-pill" color="secondary" onClick={() => { resetOrderBy(); }}>
          Reset
        </CButton>
        <CButton className="text-white" shape="rounded-pill" color="warning" onClick={() => { onSubmit(); }}>View</CButton>
      </CModalFooter>
    </CModal>
  );
};

RankedResortLifeStyleTray.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default withQueryParams({
  orderBy: JsonParam,
  page: NumberParam,
}, RankedResortLifeStyleTray);
