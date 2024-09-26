import React, { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CButton,
  CRow,
  CFormLabel,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import { currentFilterState } from '../../hooks/useQueryTypes';
import RegionSelect from '../RegionSelect/RegionSelect';
import CountrySelect from '../CountrySelect/CountrySelect';
import { showLocationTrayState } from '../../atoms/showLocationTray';



const RankedResortLocationTray: React.FC = () => {
  const [visible, setVisible] = useRecoilState(showLocationTrayState);
  const [formData, setFormData] = useRecoilState(currentFilterState);
  const router = useRouter();

  const handleClose = () => setVisible(false);

  // Effect to load initial state from URL
  useEffect(() => {
    const loadStateFromURL = () => {
      const currentFilters = router.query.filters ? JSON.parse(router.query.filters as string) : { groupedType: [], locationType: {} };
      setFormData(prevState => ({
        ...prevState,
        locationType: currentFilters.locationType || {},
      }));
    };

    loadStateFromURL();
  }, [router.query.filters, setFormData]);

  const onSubmit = useCallback(() => {
    // Parse existing filters from the router query
    const existingFilters = router.query.filters ? JSON.parse(router.query.filters as string) : { groupedType: [], locationType: {} };

    // Prepare the updated query with merged filters and updated locationType
    const updatedQuery = {
      ...router.query,
      filters: JSON.stringify({
        groupedType: existingFilters.groupedType || [],
        locationType: formData.locationType, // Use the current locationType from formData
      }),
      page: '1',
    };

    // Update the router with the new query parameters
    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    }, undefined, { scroll: false });

    handleClose();
  }, [formData.locationType, router, handleClose]);

  const resetFilters = useCallback(() => {
    // Only reset the locationType
    setFormData(prevState => ({
      ...prevState,
      locationType: {},
    }));

    // Parse existing filters to keep the groupedType
    const existingFilters = router.query.filters ? JSON.parse(router.query.filters as string) : { groupedType: [] };

    const updatedQuery = {
      ...router.query,
      filters: JSON.stringify({
        groupedType: existingFilters.groupedType || [],
        locationType: {},
      }),
      page: '1',
    };

    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    }, undefined, { scroll: false });

    handleClose();
  }, [setFormData, router, handleClose]);

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
          <div className="ps-2 pe-2 mb-2">
            <RegionSelect />
          </div>
        </CRow>
        <CRow>
          <CFormLabel className="form-label filters__scores">
            <FormattedMessage
              id="shredindex.filter.Country"
              defaultMessage="Country"
            />
          </CFormLabel>
          <div className="country-select-wrap ps-2 pe-2 mb-4">
            <CountrySelect />
          </div>
        </CRow>
      </CModalBody>
      <CModalFooter className="justify-content-between">
        <CButton className="text-white" shape="rounded-pill" color="secondary" onClick={resetFilters}>
          Clear All
        </CButton>
        <CButton className="text-white" shape="rounded-pill" color="warning" onClick={onSubmit}>
          View
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default RankedResortLocationTray;
