import React from 'react';
import {
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import RankedResortLifeStyles from './RankedResortLifeStyles/RankedResortLifeStyles';
import { currentOrderByState } from '../../hooks/useQueryOrderBy';
import { showLifestyleTrayState } from '../../atoms/showLifestyleTray';



const RankedResortLifeStyleTray: React.FC = () => {
  const [visible, setVisible] = useRecoilState(showLifestyleTrayState);
  const [formData, setFormData] = useRecoilState(currentOrderByState);
  const router = useRouter();

  const handleClose = () => {
    setVisible(false);
  };

  const onSubmit = () => {
    const activeSortby = formData;

    // Ensure `orderBy` is an object and that it's correctly serialized
    const orderByObject = activeSortby && activeSortby.type_name ? activeSortby : { type_name: 'total_score', direction: 'desc' };

    // Log the orderByObject to ensure it is correct
    console.log('Submitting orderBy:', orderByObject);

    // Update the query parameters using router.push
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        orderBy: JSON.stringify(orderByObject),
        page: '1',
      },
    }, undefined, { scroll: false });

    handleClose();
  };

  const resetOrderBy = () => {
    const defaultOrder = {
      type_name: 'total_score',
      direction: 'desc',
    };
    setFormData(defaultOrder);

    // Reset the query parameters using router.push
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        orderBy: JSON.stringify(defaultOrder),
        page: '1',
      },
    }, undefined, { scroll: false });

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
      onClose={handleClose}
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
        <CButton className="text-white" shape="rounded-pill" color="secondary" onClick={resetOrderBy}>
          Reset
        </CButton>
        <CButton className="text-white" shape="rounded-pill" color="warning" onClick={onSubmit}>
          View
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default RankedResortLifeStyleTray;
