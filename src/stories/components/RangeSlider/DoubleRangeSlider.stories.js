import React from 'react';
import { IntlProvider } from 'react-intl';
import {
  CCard, CRow, CCol, CCardHeader, CCardBody,
} from '@coreui/react';
import DoubleRangeSliderComponent from '../../../../components/DoubleRangeSlider/DoubleRangeSlider';
import langEn from '../../../../lang/en.json';

export default {
  title: 'Shred index/components',
  component: DoubleRangeSliderComponent,
  argTypes: {
    sliderState: {
      name: 'sliderState',
      options: ['withGraph', 'withoutGraph'],
      control: { type: 'select' },
    },
  },
};

export const DoubleRangeSlider = () => (
  <IntlProvider locale="en" message={langEn}>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>Range Sliders</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <p className="text-medium-emphasis small">Double range slider</p>
                <DoubleRangeSliderComponent
                  scoreType="Snow Quality"
                  sliderMin={50}
                  sliderMax={500}
                  initialLowerVal={50}
                  initialUpperVal={500}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </IntlProvider>
);
