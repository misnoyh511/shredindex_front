import React, { useCallback, useState, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CButton,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import RankedResortFilters from '../RankedResortFilters/RankedResortFilters';
import { currentFilterState } from '../../hooks/useQueryTypes';
import { FormData, FilterGroup, FilterType } from '../../types/filterTypes';
import { showFilterTrayState } from '../../atoms/showFilterTray';



const RankedResortFilterTray: React.FC = () => {
  const [visible, setVisible] = useRecoilState(showFilterTrayState);
  const [formData, setFormData] = useRecoilState<FormData>(currentFilterState);
  const resetFilterState = useResetRecoilState(currentFilterState);
  const [filterKey, setFilterKey] = useState<number>(0);
  const router = useRouter();

  const handleClose = useCallback(() => setVisible(false), [setVisible]);

  const onSubmit = useCallback(() => {
    const transformFilters = (groupedType: FormData['groupedType']): FilterType[] => {
      return groupedType
        .filter(group => group.toggleOn)
        .flatMap(group => {
          if (group.filters.length === 1 && (group.filters[0].operator === '=' || group.filters[0].value === 'yes' || group.filters[0].value === 'no')) {
            // Handle boolean filters
            return [{
              type_name: group.filters[0].type_name,
              operator: '=',
              value: group.filters[0].value === 'yes' ? 'yes' : 'no',
            }];
          } else if (group.filters.length === 2) {
            // Handle double range sliders (numeric and rating filters)
            return group.filters.map(filter => ({
              type_name: filter.type_name,
              operator: filter.operator,
              value: String(filter.value),
            })).filter(filter => filter.value !== '0' && filter.value !== '100');
          }
          return [];
        });
    };

    // Use the current formData to create activeFilters
    const activeFilters = transformFilters(formData.groupedType);

    // Create a map of active filters for easy lookup and update
    const activeFilterMap = new Map(
      activeFilters.map(filter => [`${filter.type_name}:${filter.operator}`, filter]),
    );

    // Prepare the updated query
    const updatedQuery = {
      ...router.query,
      filters: JSON.stringify({
        groupedType: Array.from(activeFilterMap.values()),
        locationType: formData.locationType,
      }),
      page: '1', // Reset to first page when filters change
    };

    // Update the router with the new query parameters
    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    }, undefined, { scroll: false });

    // The formData is already up-to-date, so we don't need to update it here

    handleClose();
  }, [formData, router, handleClose]);

  // Effect to synchronize form state with URL on component mount and URL changes
  useEffect(() => {
    const syncFormWithURL = () => {
      const currentFilters = router.query.filters ? JSON.parse(router.query.filters as string) : { groupedType: [], locationType: {} };

      setFormData(prevState => {
        const updatedGroupedType = prevState.groupedType.map(group => {
          const activeFiltersForGroup = currentFilters.groupedType.filter((filter: FilterType) => filter.type_name === group.filters[0].type_name);
          if (activeFiltersForGroup.length > 0) {
            return {
              ...group,
              toggleOn: true,
              filters: group.filters.map(filter => {
                const matchingFilter = activeFiltersForGroup.find((af: FilterType) => af.operator === filter.operator);
                return matchingFilter ? { ...filter, value: matchingFilter.value } : filter;
              }),
            };
          }
          return { ...group, toggleOn: false };
        });

        return {
          ...prevState,
          groupedType: updatedGroupedType,
          locationType: currentFilters.locationType,
        };
      });
    };

    syncFormWithURL();
  }, [router.query.filters, setFormData]);


  const resetFilters = useCallback(() => {
    resetFilterState();
    setFilterKey((prevKey) => prevKey + 1);
    localStorage.removeItem('currentFilterState');

    const resetGroupedType: FilterGroup[] = formData.groupedType.map((group) => ({
      ...group,
      toggleOn: false,
      filters: group.filters.map((filter) => ({
        ...filter,
        value: filter.operator === '>' ? '0' : filter.operator === '<' ? '100' : 'no',
      })),
    }));

    const resetFormData: FormData = {
      groupedType: resetGroupedType,
      locationType: {},  // Reset locationType only
    };

    setFormData(resetFormData);

    const updatedQuery = {
      ...router.query,
      filters: JSON.stringify({ groupedType: [], locationType: {} }),
      page: '1',
    };

    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    }, undefined, { scroll: false });
  }, [formData, setFormData, resetFilterState, router]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    localStorage.setItem('filterTrayScroll', event.currentTarget.scrollTop.toString());
  }, []);

  const setInitialScroll = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      const savedPosition = localStorage.getItem('filterTrayScroll');
      if (savedPosition) {
        ref.scrollTop = parseInt(savedPosition, 10);
      }
    }
  }, []);

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
      <CModalBody onScroll={handleScroll} ref={setInitialScroll}>
        <RankedResortFilters key={filterKey} />
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

export default RankedResortFilterTray;
