import React, { useMemo } from 'react';
import { CForm, CRow, CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import {
  cilBaby,
  cilDiamond,
  cilSpeedometer,
  cilSnowflake,
  cilMoney,
} from '@coreui/icons';
import PropTypes from 'prop-types';
import useQueryOrderBy, { currentOrderByState } from '../../hooks/useQueryOrderBy';
import { helicopter } from '../../icons/awesomeIcons';

const lifestyles = [
  { key: 'family_friendly', icon: cilBaby, label: 'Family' },
  { key: 'shops', icon: cilDiamond, label: 'Luxury' },
  { key: 'expert_terrain_score', icon: cilSpeedometer, label: 'Hardcore' },
  { key: 'average_annual_snowfall', icon: cilSnowflake, label: 'Powder' },
  { key: 'total_score', icon: helicopter, label: 'Helicopter' },
  { key: 'affordability', icon: cilMoney, label: 'Cheap' },
];

const HomeLifeStylesFilterButtons = ({ setLifeStyle }) => {
  const [formData, setFormData] = useRecoilState(currentOrderByState);
  const router = useRouter();

  const defaultType = { key: 'family_friendly', icon: cilBaby, label: 'Family' };
  const defaultDirection = 'desc';

  const { loading, error } = useQueryOrderBy();

  const handleLifestyleChange = (lifestyle) => {
    const newFormData = {
      type_name: lifestyle.key || defaultType.key,
      direction: formData?.direction || defaultDirection,
    };

    setFormData(newFormData);

    const updatedQuery = {
      ...router.query,
      orderBy: JSON.stringify(newFormData),
      page: '1', // Reset to the first page when filters change
    };

    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    }, undefined, { scroll: false });

    setLifeStyle(lifestyle.label || defaultType.label);
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
      <CIcon icon={lifestyle.icon} size="xl" />
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
