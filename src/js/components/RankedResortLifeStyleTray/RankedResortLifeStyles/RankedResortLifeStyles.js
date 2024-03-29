import {
  CForm,
  CRow,
  CFormLabel,
  CFormSelect, CFormCheck, CButtonGroup,
} from '@coreui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import useQueryOrderBy, { currentOrderByState } from '../../../hooks/useQueryOrderBy';
import ResortCardError from '../../ResortCardError/ResortCardError';

const RankedResortLifeStyles = () => {
  const [formData, setFormData] = useRecoilState(currentOrderByState);

  const defaultType = 'total_score';
  const defaultDirection = 'desc';

  if (!formData) {
    setFormData({
      type_name: defaultType,
      direction: defaultDirection,
    });
  }

  const {
    loading, error, mappedOptions,
  } = useQueryOrderBy();

  const onClickSetDirection = (direction) => {
    setFormData({
      type_name: formData?.type_name || defaultType,
      direction,
    });
  };

  if (loading) {
    return (
      <CForm>
        <CRow className="mb-4">
          <CFormLabel className="form-label lifestyles">
            <FormattedMessage
              id="shredindex.filter.ORDER_Type"
              defaultMessage="Order type"
            />
          </CFormLabel>
          <div className={'ps-2 pe-2'}>
            Loading...
          </div>
        </CRow>
        <CRow>
          <CFormLabel className="form-label lifestyles">
            <FormattedMessage
              id="shredindex.filter.ORDERY_BY"
              defaultMessage="Order by"
            />
          </CFormLabel>
          <div>
            Loading...
          </div>
        </CRow>
      </CForm>
    );
  }

  if (error) {
    return <ResortCardError />;
  }

  return (
    <CForm>
      <CRow className="mb-4">
        <CFormLabel className="form-label lifestyles">
          <FormattedMessage
            id="shredindex.filter.ORDER_Type"
            defaultMessage="Order type"
          />
        </CFormLabel>
        <div className={'ps-2 pe-2'}>
          {mappedOptions?.length >= 1 && (
            <CFormSelect
              value={formData.type_name || 'total_score'}
              onChange={(e) => setFormData({
                type_name: e.target.value,
                direction: formData?.direction || defaultDirection,
              })}
              options={mappedOptions}
            />
          )}
        </div>
      </CRow>
      <CRow>
        <CFormLabel className="form-label lifestyles">
          <FormattedMessage
            id="shredindex.filter.ORDERY_BY"
            defaultMessage="Order by"
          />
        </CFormLabel>
        <CButtonGroup className="me-2" role="group" aria-label="Basic checkbox toggle button group">
          <CFormCheck
            onChange={() => onClickSetDirection('desc')}
            button={{
              color: 'primary',
              variant: 'outline',
            }}
            id="btncheck2"
            autoComplete="off"
            label="Top first"
            value="desc"
            checked={formData.direction === 'desc' || !formData.direction}
          />
          <CFormCheck
            button={{
              color: 'primary',
              variant: 'outline',
            }}
            onChange={() => onClickSetDirection('asc')}
            id="btncheck1"
            autoComplete="off"
            label="Lowest first"
            checked={formData.direction === 'asc'}
          />
        </CButtonGroup>
      </CRow>
    </CForm>
  );
};

export default RankedResortLifeStyles;
