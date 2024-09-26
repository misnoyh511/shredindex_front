import React from 'react';
import { atom, useRecoilValue } from 'recoil';
import {
  CToast, CToastBody, CToastClose, CToaster,
} from '@coreui/react';

interface ToastState {
  visible: boolean;
  message: string;
}

export const toastState = atom<ToastState>({
  key: 'toastState',
  default: {
    visible: false,
    message: '',
  },
});

const GlobalToast: React.FC = () => {
  const toast = useRecoilValue(toastState);

  return (
    <div style={{
      position: 'fixed',
      display: 'block',
      top: '2rem',
      width: '100%',
      right: '2rem',
      zIndex: 9999,
    }}
    >
      <CToaster className="end-0">
        {toast.visible && (
          <CToast className="d-flex" color="secondary" visible>
            <CToastBody>{toast.message}</CToastBody>
            <CToastClose className="me-2 m-auto" />
          </CToast>
        )}
      </CToaster>
    </div>
  );
};

export default GlobalToast;
