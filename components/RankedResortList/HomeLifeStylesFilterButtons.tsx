import React, { useMemo } from 'react';
import { CForm, CRow, CButton } from '@coreui/react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import {
  cilBaby,
} from '@coreui/icons';
import PropTypes from 'prop-types';
import { currentOrderByState } from '../../atoms/filterState';
import useQueryOrderBy from '../../hooks/useQueryOrderBy';
import { TypeIcon } from '@/Icons/TypeIcon';

const lifestyles = [
  { key: 'family_friendly', name: 'family_friendly', label: 'Family' },
  { key: 'shops', name: 'shops', label: 'Luxury' },
  { key: 'expert_terrain_score', name: 'expert_terrain_score', label: 'Extreme' },
  { key: 'snow_quality', name: 'snow_quality', label: 'Powder' },
  { key: 'total_score', name: 'helicopter', label: 'Helicopter' },
  { key: 'affordability', name: 'affordability', label: 'Affordable' },
] as const;

const HomeLifeStylesFilterButtons = ({ setLifeStyle }) => {
  const [formData, setFormData] = useRecoilState(currentOrderByState);
  const router = useRouter();

  const defaultType = { key: 'family_friendly', icon: cilBaby, label: 'Family' };
  const defaultDirection = 'desc';

  const { loading, error } = useQueryOrderBy();

  const handleLifestyleChange = (lifestyle) => {
    // Batch the synchronous state updates first
    const newFormData = {
      type_name: lifestyle.key || defaultType.key,
      direction: formData?.direction || defaultDirection,
    };

    setFormData(newFormData);
    setLifeStyle(lifestyle.label || defaultType.label);

    // Update URL without awaiting
    const updatedQuery = {
      ...router.query,
      orderBy: JSON.stringify(newFormData),
      page: '1',
    };

    // Use shallow routing for faster URL updates
    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    }, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  const getButtonVariant = (lifestyle) => {
    const orderByObject = router.query.orderBy ? JSON.parse(router.query.orderBy as string) : {};
    if (orderByObject?.type_name === lifestyle.key) {
      return 'outline';
    }
    if (!orderByObject?.type_name && lifestyle.key === 'family_friendly') {
      return 'outline';
    }
    return 'ghost';
  };

  const lifestyleButtons = useMemo(() => lifestyles.map((lifestyle) => (
    <CButton
      key={lifestyle.key}
      color="light"
      variant={getButtonVariant(lifestyle)}
      className="d-flex flex-column align-items-center p-2 m-1"
      onClick={() => handleLifestyleChange(lifestyle)}
    >
      <TypeIcon
        typeName={lifestyle.name}
        size="3rem"
      />
      <span className="mt-2">{lifestyle.label}</span>
    </CButton>
  )), [router.query.orderBy, handleLifestyleChange]);

  if (loading) {
    return (
      <CForm>
        <CRow className="mb-4">
          <div className="home-lifestyles-buttons mb-4 d-flex flex-wrap justify-content-center">
            {lifestyleButtons}
          </div>
        </CRow>
      </CForm>
    );
  }
  if (error) return <p>Error</p>;

  return (
    <CForm>
      <CRow className="mb-4">
        <div className="home-lifestyles-buttons mb-4 d-flex flex-wrap justify-content-center">
          {lifestyleButtons}
        </div>
      </CRow>
    </CForm>
  );
};

HomeLifeStylesFilterButtons.propTypes = {
  setLifeStyle: PropTypes.func.isRequired,
};

export default HomeLifeStylesFilterButtons;
