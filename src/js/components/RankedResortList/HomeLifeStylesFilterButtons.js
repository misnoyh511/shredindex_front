import React, { useMemo } from 'react';
import {
  CForm,
  CRow,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useRecoilState } from 'recoil';
import {
  cilBaby,
  cilDiamond,
  cilSpeedometer,
  cilSnowflake,
  cilMoney,
} from '@coreui/icons';
import { useQueryParams, StringParam, JsonParam } from 'use-query-params';
import PropTypes from 'prop-types';
import useQueryOrderBy, { currentOrderByState } from '../../hooks/useQueryOrderBy';
import { helicopterThin } from '../../../icons/helicopter';

const lifestyles = [
  { key: 'family_vacation_score', icon: cilBaby, label: 'Family' },
  { key: 'shops', icon: cilDiamond, label: 'Luxury' },
  { key: 'expert_terrain', icon: cilSpeedometer, label: 'Hardcore' },
  { key: 'average_annual_snowfall', icon: cilSnowflake, label: 'Powder' },
  { key: 'total_score', icon: helicopterThin, label: 'Helicopter' },
  { key: 'affordability', icon: cilMoney, label: 'Cheap' },
];

const HomeLifeStylesFilterButtons = ({ setLifeStyle }) => {
  const [formData, setFormData] = useRecoilState(currentOrderByState);
  const [query, setQuery] = useQueryParams({
    orderBy: JsonParam,
  });

  const defaultType = { key: 'family_vacation_score', icon: cilBaby, label: 'Family' };
  const defaultDirection = 'desc';

  const {
    loading, error, mappedOptions,
  } = useQueryOrderBy();

  const handleLifestyleChange = (lifestyle) => {
    if (lifestyle === 'helicopter') {
      // Then must have generic
    }

    const newFormData = {
      type_name: lifestyle.key || defaultType,
      direction: formData?.direction || defaultDirection,
    };
    setFormData(newFormData);
    setQuery({ orderBy: newFormData, page: 1 });
    setLifeStyle(lifestyle.label || defaultType.label);
  };

  const getButtonVariant = (lifestyle) => {
    let buttonVariant;
    if (query?.orderBy?.type_name === lifestyle.key) {
      buttonVariant = 'outline';
    } else if (!query?.orderBy?.type_name && lifestyle.key === 'family_vacation_score') {
      buttonVariant = 'outline';
    } else {
      buttonVariant = 'ghost';
    } return buttonVariant;
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
  )), [query.orderBy, handleLifestyleChange]);

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
