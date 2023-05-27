import {
  CModal, CModalHeader, CModalTitle, CModalBody,
} from '@coreui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { atom, useRecoilState } from 'recoil';

export const showLifestyleTrayState = atom({
  key: 'showLifestyleTrayState',
  default: false,
});

const RankedResortLifeStyleTray = () => {
  const [visible, setVisible] = useRecoilState(showLifestyleTrayState);

  const handleClose = () => {
    setVisible(false);
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
            id="shredindex.filter.LIFESTYLES"
            defaultMessage="LifeStyles"
          />
        </CModalTitle>
      </CModalHeader>
      <CModalBody />
    </CModal>
  );
};

export default RankedResortLifeStyleTray;
