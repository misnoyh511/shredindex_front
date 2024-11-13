import React, { useState, useRef, useEffect } from 'react';
import {
  CRow,
  CFormCheck,
  CButtonGroup,
} from '@coreui/react';
import { TypeIcon } from '@/Icons/TypeIcon';
import { useRecoilState } from 'recoil';
import { currentOrderByState } from '../../../atoms/filterState';
import useQueryOrderBy from '../../../hooks/useQueryOrderBy';
import { TypeDescription } from '@/TypeDescription/TypeDescription';
import { CIcon } from '@coreui/icons-react';
import { cilArrowLeft } from '@coreui/icons';

const CustomSelect = ({ value, onChange, options }) => {
  const [showCustom, setShowCustom] = useState(false);
  const customSelectRef = useRef(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (customSelectRef.current && !customSelectRef.current.contains(event.target)) {
        setShowCustom(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const CustomOption = ({ typeName, label, selected }) => (
    <div>
      <div className="d-flex align-items-center gap-2 py-2 px-3">
        <TypeIcon className="flex-shrink-0" typeName={typeName} size="2rem"/>
        <span className={selected ? 'fw-semibold' : ''}>{label}</span>
      </div>
      <div className="generic-description fw-light small mt-2">
        <TypeDescription label={typeName}/>.
      </div>
    </div>
  );

  return (
    <div className="position-relative" ref={customSelectRef}>
      <div className="">
        <button
          type="button"
          className="form-select d-flex align-items-center w-100 text-start"
          onClick={() => setShowCustom(!showCustom)}
        >
          {selectedOption && (
            <CustomOption
              typeName={selectedOption.value}
              label={selectedOption.label}
              selected={true}
            />
          )}
        </button>

        {showCustom && (
          <div className="position-fixed start-0 end-0 shadow-lg border rounded-bottom dropdown-modal"
               style={{
                 top: '0',
                 height: '100vh',
                 zIndex: 1050,
                 overflowY: 'auto',
                 paddingTop: '1rem',
               }}>
            <div className="container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div/>
                <h5 className="mb-0">Select Option</h5>
                <div
                  role="button"
                  aria-label="Back button"
                  tabIndex={0}
                  onClick={() => setShowCustom(false)}
                  className="resort back-button"
                >
                  <CIcon icon={cilArrowLeft}/>
                </div>
              </div>
              {options.map(option => (
                <>
                  <hr/>
                  <button
                    key={option.value}
                    type="button"
                    className="d-block w-100 text-start border-0 bg-transparent py-2 text-white"
                    onClick={() => {
                      onChange(option.value);
                      setShowCustom(false);
                    }}
                  >
                    <CustomOption
                      typeName={option.value}
                      label={option.label}
                      selected={option.value === value}
                    />
                  </button>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RankedResortLifeStyles = () => {
  const [formData, setFormData] = useRecoilState(currentOrderByState);
  const defaultType = 'total_score';
  const defaultDirection = 'desc';

  const {
    loading,
    error,
    mappedOptions,
  } = useQueryOrderBy();

  useEffect(() => {
    if (!formData) {
      setFormData({
        type_name: defaultType,
        direction: defaultDirection,
      });
    }
  }, [formData, setFormData]);

  const onClickSetDirection = (direction) => {
    setFormData({
      type_name: formData?.type_name || defaultType,
      direction,
    });
  };

  const handleSelect = (value) => {
    setFormData({
      type_name: value,
      direction: formData?.direction || defaultDirection,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <CRow>
        <div className="w-100 mb-4">
          {mappedOptions?.length >= 1 && (
            <CustomSelect
              value={formData?.type_name || defaultType}
              onChange={handleSelect}
              options={mappedOptions}
            />
          )}
        </div>
      </CRow>

      <CRow>
        <CButtonGroup role="group" aria-label="Sort direction">
          <CFormCheck
            type="radio"
            onClick={() => onClickSetDirection('desc')}
            button={{
              color: 'primary',
              variant: 'outline',
            }}
            id="btncheck2"
            autoComplete="off"
            label="Top first"
            value="desc"
            checked={formData?.direction === 'desc' || !formData?.direction}
          />
          <CFormCheck
            type="radio"
            onClick={() => onClickSetDirection('asc')}
            button={{
              color: 'primary',
              variant: 'outline',
            }}
            id="btncheck1"
            autoComplete="off"
            label="Lowest first"
            checked={formData?.direction === 'asc'}
          />
        </CButtonGroup>
      </CRow>
    </div>
  );
};

export default RankedResortLifeStyles;
