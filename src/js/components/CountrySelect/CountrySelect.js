import React, { useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useRecoilState } from 'recoil';
import { currentFilterState } from '../../hooks/useQueryTypes';
import { getContinent } from '../../hooks/getContinent';

const CountrySelect = () => {
  const [formData, setFormData] = useRecoilState(currentFilterState);
  const allCountries = useMemo(() => countryList().getData(), []);

  // Filter countries based on selected continents
  const availableCountries = useMemo(() => {
    const selectedContinents = formData.locationType?.continentId || [];
    if (selectedContinents.length > 0) {
      return allCountries.filter((country) => {
        const continent = getContinent(country.value);
        return selectedContinents.includes(continent?.continent_id);
      });
    }
    return allCountries;
  }, [formData.locationType?.continentId, allCountries]);

  const handleChange = (selectedOptions) => {
    const newSelectedCountries = selectedOptions
      ? selectedOptions.map((option) => option.value) : [];
    setFormData((prevData) => ({
      ...prevData,
      locationType: {
        ...prevData.locationType,
        countryId: newSelectedCountries.length > 0 ? newSelectedCountries : undefined,
      },
    }));
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#1d2e39',
      borderColor: state.isFocused ? '#4dc5b3' : '#344a59',
      boxShadow: state.isFocused ? '0 0 0 1px #4dc5b3' : 'none',
      '&:hover': {
        borderColor: '#4dc5b3',
      },
      color: '#bdd3df',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1d2e39',
      color: '#bdd3df',
    }),
    option: (provided, state) => {
      let backgroundColor;
      if (state.isSelected) {
        backgroundColor = '#4dc5b3';
      } else if (state.isFocused) {
        backgroundColor = '#344a59';
      } else {
        backgroundColor = '#1d2e39';
      }

      return {
        ...provided,
        backgroundColor,
        color: '#bdd3df',
        '&:hover': {
          backgroundColor: '#344a59',
          color: '#bdd3df',
        },
      };
    },
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#344a59',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#bdd3df',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#bdd3df',
      '&:hover': {
        backgroundColor: '#4dc5b3',
        color: '#1d2e39',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#bdd3df',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#445f70',
    }),
    input: (provided) => ({
      ...provided,
      color: '#bdd3df',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#4dc5b3',
      '&:hover': {
        color: '#4dc5b3',
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#4dc5b3',
      '&:hover': {
        color: '#4dc5b3',
      },
    }),
  };

  const formatOptionLabel = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
        style={{ marginRight: '10px', width: '20px', height: '15px' }}
        alt={`${label} flag`}
      />
      {label}
    </div>
  );

  return (
    <div className="country-select">
      <Select
        isMulti
        options={availableCountries}
        value={availableCountries.filter(
          (option) => formData.locationType?.countryId?.includes(option.value),
        )}
        onChange={handleChange}
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        placeholder="Select countries..."
      />
    </div>
  );
};

export default CountrySelect;
