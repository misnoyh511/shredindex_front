import React from 'react';
import { atom, useRecoilValue } from 'recoil';
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/react';

export const toastState = atom({
  key: 'toastState',
  default: {
    visible: false,
    message: '',
  },
});
const GlobalToast = () => {
  const toast = useRecoilValue(toastState);

  return (
    <CToaster className="end-0" position="static">
      {toast.visible && (
        <CToast className="d-flex" color="secondary" visible>
          <CToastBody>{toast.message}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </CToast>
      )}
    </CToaster>
  );
};

export default GlobalToast;
