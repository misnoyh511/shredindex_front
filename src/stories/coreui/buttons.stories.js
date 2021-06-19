import {
  CButton,
  CButtonGroup,
  CButtonToolbar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import {
  cibBehance,
  cibDribbble,
  cibFacebook,
  cibFlickr,
  cibGithub,
  cibInstagram,
  cibLinkedin,
  cibPinterest,
  cibReddit,
  cibStackoverflow,
  cibTumblr,
  cibTwitter,
  cibVimeo,
  cibVk,
  cibXing,
  cibYahoo,
  cibYoutube,
} from '@coreui/icons';
import React from 'react';

export default { title: 'CoreUI/Buttons' };

export const Buttons = () => (
  <>
    <div className="c-main container-fluid">
      <CCard>
        <CCardHeader>
          Standard Buttons
        </CCardHeader>
        <CCardBody>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="primary">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="link">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="primary" aria-pressed="true">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="secondary" aria-pressed="true">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="success" aria-pressed="true">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="warning" aria-pressed="true">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="danger" aria-pressed="true">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="info" aria-pressed="true">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="light" aria-pressed="true">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="dark" aria-pressed="true">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="link" aria-pressed="true">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="link" disabled>Link</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          variant="outline" Buttons
        </CCardHeader>
        <CCardBody>
          <p>
            With
            {' '}
            <code>outline</code>
            {' '}
            prop.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="primary">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" />
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                active
                color="primary"
                aria-pressed="true"
              >
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                active
                color="secondary"
                aria-pressed="true"
              >
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                active
                color="success"
                aria-pressed="true"
              >
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                active
                color="warning"
                aria-pressed="true"
              >
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                active
                color="danger"
                aria-pressed="true"
              >
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                active
                color="info"
                aria-pressed="true"
              >
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                active
                color="light"
                aria-pressed="true"
              >
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                active
                color="dark"
                aria-pressed="true"
              >
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" />
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" />
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          variant="ghost" Buttons
        </CCardHeader>
        <CCardBody>
          <p>
            Use
            {' '}
            <code>.btn-ghost-*</code>
            {' '}
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            class for variant="ghost" buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="primary">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" />
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                active
                variant="ghost"
                color="primary"
                aria-pressed="true"
              >
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                active
                variant="ghost"
                color="secondary"
                aria-pressed="true"
              >
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                active
                variant="ghost"
                color="success"
                aria-pressed="true"
              >
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                active
                variant="ghost"
                color="warning"
                aria-pressed="true"
              >
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                active
                variant="ghost"
                color="danger"
                aria-pressed="true"
              >
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                active
                variant="ghost"
                color="info"
                aria-pressed="true"
              >
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                active
                variant="ghost"
                color="light"
                aria-pressed="true"
              >
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                block
                active
                variant="ghost"
                color="dark"
                aria-pressed="true"
              >
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" />
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" />
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Square Buttons
        </CCardHeader>
        <CCardBody>
          <p>
            Use
            {' '}
            <code>.btn-square</code>
            {' '}
            class for square buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="primary">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="link">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="square"
                color="primary"
                aria-pressed="true"
              >
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="square"
                color="secondary"
                aria-pressed="true"
              >
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="square"
                color="success"
                aria-pressed="true"
              >
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="square"
                color="warning"
                aria-pressed="true"
              >
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="square"
                color="danger"
                aria-pressed="true"
              >
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="info" aria-pressed="true">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="square"
                color="light"
                aria-pressed="true"
              >
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="dark" aria-pressed="true">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="link" aria-pressed="true">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="link" disabled>Link</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Pill Buttons
        </CCardHeader>
        <CCardBody>
          <p>
            Use
            {' '}
            <code>.btn-pill</code>
            {' '}
            class for pill buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="primary" className="">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="link">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="pill"
                color="primary"
                aria-pressed="true"
              >
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="pill"
                color="secondary"
                aria-pressed="true"
              >
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="pill"
                color="success"
                aria-pressed="true"
              >
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="pill"
                color="warning"
                aria-pressed="true"
              >
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton
                active
                block
                shape="pill"
                color="danger"
                aria-pressed="true"
              >
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="info" aria-pressed="true">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="light" aria-pressed="true">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="dark" aria-pressed="true">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="link" aria-pressed="true">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="link" disabled>Link</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Sizes
        </CCardHeader>
        <CCardBody>
          <p>
            Fancy larger or smaller buttons?
            Add
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <code>size="lg"</code>
            {' '}
            or
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <code>size="sm"</code>
            {' '}
            for additional sizes.
          </p>
          <CRow className="align-items-center">
            <CCol col="2" xl className="mb-3 mb-xl-0">
              Small
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="primary" size="sm">Standard Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="secondary" variant="outline" size="sm">Outline Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton size="sm" variant="ghost" color="ghost">Ghost Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning" size="sm">Square Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="pill" color="danger" size="sm">Pill Button</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="2" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="primary">Standard Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton variant="outline" color="secondary">Outline Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton variant="ghost" color="success">Ghost Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning">Square Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="pill" color="danger">Pill Button</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="2" xl className="mb-3 mb-xl-0">
              Large
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="primary" size="lg">Standard Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton variant="outline" color="secondary" size="lg">Outline Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton variant="ghost" color="success" size="lg">Ghost Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning" size="lg">Square Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="pill" color="danger" size="lg">Pill Button</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          With Icons
        </CCardHeader>
        <CCardBody>
          <CRow className="align-items-center mt-3">
            <CCol col="2" className="text-center mt-3">
              <CButton color="primary">
                Standard Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton color="secondary" variant="outline">
                <CIcon name="cil-lightbulb" />
                Outline Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton variant="ghost" color="success">
                <CIcon name="cil-lightbulb" />
                Ghost Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton shape="square" color="warning">
                <CIcon name="cil-lightbulb" />
                Square Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton shape="pill" color="danger">
                <CIcon name="cil-lightbulb" />
                Pill Button
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Block Level Buttons
            </CCardHeader>
            <CCardBody>
              <p>
                Add prop
                <code>block</code>
              </p>
              <CButton color="secondary" size="lg" block>Block level button</CButton>
              <CButton color="primary" size="lg" block>Block level button</CButton>
              <CButton color="success" size="lg" block>Block level button</CButton>
              <CButton color="info" size="lg" block>Block level button</CButton>
              <CButton color="warning" size="lg" block>Block level button</CButton>
              <CButton color="danger" size="lg" block>Block level button</CButton>
              <CButton color="link" size="lg" block>Block level button</CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Block Level Buttons
            </CCardHeader>
            <CCardBody>
              <p>
                Add prop
                <code>block</code>
              </p>
              <CButton variant="outline" color="secondary" size="lg" block>
                Block level
                button
              </CButton>
              <CButton variant="outline" color="primary" size="lg" block>
                Block level
                button
              </CButton>
              <CButton variant="outline" color="success" size="lg" block>
                Block level
                button
              </CButton>
              <CButton variant="outline" color="info" size="lg" block>Block level button</CButton>
              <CButton variant="outline" color="warning" size="lg" block>
                Block level
                button
              </CButton>
              <CButton variant="outline" color="danger" size="lg" block>
                Block level
                button
              </CButton>
              <CButton variant="ghost" color="info" size="lg" block>Block level button</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  </>
);

export const ButtonDropdowns = () => (
  <div className="c-main container-fluid">
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Dropdowns
            <div className="card-header-actions">
              <a
                href="https://coreui.github.io/components/button-dropdown/"
                rel="noreferrer noopener"
                target="_blank"
                className="card-header-action"
              >
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDropdown className="m-1">
              <CDropdownToggle>
                Dropdown button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="primary">
                Primary
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="secondary">
                Secondary
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="success">
                Success
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="info">
                Info
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="warning">
                Warning
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="danger">
                Danger
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />
            <CDropdown className="m-1">
              <CDropdownToggle split color="primary">
                Primary
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="secondary">
                Secondary
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="success">
                Success
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="info">
                Info
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="warning">
                Warning
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="danger">
                Danger
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1" size="lg">
              <CDropdownToggle color="secondary">
                Large button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            {' '}
            <CDropdown className="m-1">
              <CDropdownToggle split color="secondary" size="lg">
                Large split button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary" size="sm">
                Small button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            {' '}
            <CDropdown className="m-1">
              <CDropdownToggle color="secondary" size="sm" split>
                Small split button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">
                Dropup button
              </CDropdownToggle>
              <CDropdownMenu placement="top">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="secondary">
                Split dropup
              </CDropdownToggle>
              <CDropdownMenu placement="top">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Menus
          </CCardHeader>
          <CCardBody>

            <CDropdown className="m-1 d-inline-block">
              <CDropdownToggle color="secondary">
                Direction Up
              </CDropdownToggle>
              <CDropdownMenu placement="top">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown className="m-1 d-inline-block">
              <CDropdownToggle color="secondary">
                Direction Left
              </CDropdownToggle>
              <CDropdownMenu placement="left">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown className="m-1 d-inline-block">
              <CDropdownToggle color="secondary">
                Direction Right
              </CDropdownToggle>
              <CDropdownMenu placement="right">
                <CDropdownHeader>Header</CDropdownHeader>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown className="m-1 d-inline-block">
              <CDropdownToggle color="secondary">
                Default Down
              </CDropdownToggle>
              <CDropdownMenu
                placement="bottom"
                modifiers={[{
                  name: 'flip',
                  enabled: false,
                }]}
              >
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">
                This dropdown
                {'\''}
                s menu is right-aligned
              </CDropdownToggle>
              <CDropdownMenu placement="right">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">
                Dropdown with header
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">
                Dropdown with divider
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">
                Dropdown with disabled item
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem disabled>Disabled Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="info">
                Dropdown with form
              </CDropdownToggle>

            </CDropdown>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
);

export const ButtonGroups = () => (
  <div className="c-main container-fluid">
    <CRow>
      <CCol md="6">

        <CCard>
          <CCardHeader>
            Button Group
            <div className="card-header-actions">
              <a
                href="https://coreui.github.io/components/button-group/"
                rel="noreferrer noopener"
                target="_blank"
                className="card-header-action"
              >
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CCardHeader>
          <CCardBody>
            <CButtonGroup>
              <CButton color="secondary">Left</CButton>
              <CButton color="secondary">Middle</CButton>
              <CButton color="secondary">Right</CButton>
            </CButtonGroup>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            Button Group
            <small> toolbar</small>
          </CCardHeader>
          <CCardBody>
            <CButtonToolbar className="mb-3">
              <CButtonGroup className="mr-2">
                <CButton color="secondary">1</CButton>
                <CButton color="secondary">2</CButton>
                <CButton color="secondary">3</CButton>
                <CButton color="secondary">4</CButton>
              </CButtonGroup>
              <CButtonGroup className="mr-2">
                <CButton color="secondary">5</CButton>
                <CButton color="secondary">6</CButton>
                <CButton color="secondary">7</CButton>
              </CButtonGroup>
              <CButtonGroup>
                <CButton color="secondary">8</CButton>
              </CButtonGroup>
            </CButtonToolbar>
            <CButtonToolbar className="mb-3">
              <CButtonGroup className="mr-2">
                <CButton color="secondary">1</CButton>
                <CButton color="secondary">2</CButton>
                <CButton color="secondary">3</CButton>
                <CButton color="secondary">4</CButton>
              </CButtonGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>@</CInputGroupText>
                </CInputGroupPrepend>
                <CInput placeholder="Input group example" />
              </CInputGroup>
            </CButtonToolbar>
            <CButtonToolbar justify="between">
              <CButtonGroup>
                <CButton color="secondary">1</CButton>
                <CButton color="secondary">2</CButton>
                <CButton color="secondary">3</CButton>
                <CButton color="secondary">4</CButton>
              </CButtonGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>@</CInputGroupText>
                </CInputGroupPrepend>
                <CInput placeholder="Input group example" />
              </CInputGroup>
            </CButtonToolbar>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            Button Group
            <small> vertical variation</small>
          </CCardHeader>
          <CCardBody>
            <CButtonGroup vertical>
              <CButton color="secondary">1</CButton>
              <CButton color="secondary">2</CButton>
              <CButton color="secondary">3</CButton>
            </CButtonGroup>
          </CCardBody>
        </CCard>

      </CCol>
      <CCol md={6}>

        <CCard>
          <CCardHeader>
            Button Group
            <small> sizing</small>
          </CCardHeader>
          <CCardBody>
            <CButtonGroup size="lg">
              <CButton color="secondary">Left</CButton>
              <CButton color="secondary">Middle</CButton>
              <CButton color="secondary">Right</CButton>
            </CButtonGroup>
            <br />
            <br />
            <CButtonGroup>
              <CButton color="secondary">Left</CButton>
              <CButton color="secondary">Middle</CButton>
              <CButton color="secondary">Right</CButton>
            </CButtonGroup>
            <br />
            <br />
            <CButtonGroup size="sm">
              <CButton color="secondary">Left</CButton>
              <CButton color="secondary">Middle</CButton>
              <CButton color="secondary">Right</CButton>
            </CButtonGroup>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            Button Group
            <small> nestingccc</small>
          </CCardHeader>
          <CCardBody>
            <CButtonGroup>
              <CButton color="secondary">1</CButton>
              <CButton color="secondary">2</CButton>
              <CDropdown color="secondary">
                <CDropdownToggle caret color="secondary">
                  Dropdown
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Dropdown Link</CDropdownItem>
                  <CDropdownItem>Dropdown Link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CButtonGroup>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            Button Group
            <small> vertical</small>
          </CCardHeader>
          <CCardBody>
            <CButtonGroup vertical>
              <CButton color="secondary">1</CButton>
              <CButton color="secondary">2</CButton>
              <CDropdown>
                <CDropdownToggle color="secondary" caret>
                  Dropdown
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Dropdown Link</CDropdownItem>
                  <CDropdownItem>Dropdown Link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CButtonGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
);

export const BrandButtons = () => (
  <div className="c-main container-fluid">
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Brand button
          </CCardHeader>
          <CCardBody>
            <h6>
              Size Small
              <small>
                {' '}
                Add this class
                <code>.btn-sm</code>
              </small>
            </h6>
            <p>
              <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFacebook}
                  name="cib-facebook"
                />
                <span>Facebook</span>
              </CButton>
              <CButton size="sm" className="btn-twitter btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTwitter}
                  name="cib-twitter"
                />
                <span>Twitter</span>
              </CButton>
              <CButton size="sm" className="btn-linkedin btn-brand mr-1 mb-1">
                <CIcon
                  content={cibLinkedin}
                  name="cib-linkedin"
                />
                <span>LinkedIn</span>
              </CButton>
              <CButton size="sm" className="btn-flickr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFlickr}
                  name="cib-flickr"
                />
                <span>Flickr</span>
              </CButton>
              <CButton size="sm" className="btn-tumblr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTumblr}
                  name="cib-tumblr"
                />
                <span>Tumblr</span>
              </CButton>
              <CButton size="sm" className="btn-xing btn-brand mr-1 mb-1">
                <CIcon
                  content={cibXing}
                  name="cib-xing"
                />
                <span>Xing</span>
              </CButton>
              <CButton size="sm" className="btn-github btn-brand mr-1 mb-1">
                <CIcon
                  content={cibGithub}
                  name="cib-github"
                />
                <span>Github</span>
              </CButton>
              <CButton size="sm" className="btn-stack-overflow btn-brand mr-1 mb-1">
                <CIcon
                  content={cibStackoverflow}
                  name="cib-stackoverflow"
                />
                <span>StackOverflow</span>
              </CButton>
              <CButton size="sm" className="btn-youtube btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYoutube}
                  name="cib-youtube"
                />
                <span>YouTube</span>
              </CButton>
              <CButton size="sm" className="btn-dribbble btn-brand mr-1 mb-1">
                <CIcon
                  content={cibDribbble}
                  name="cib-dribbble"
                />
                <span>Dribbble</span>
              </CButton>
              <CButton size="sm" className="btn-instagram btn-brand mr-1 mb-1">
                <CIcon
                  content={cibInstagram}
                  name="cib-instagram"
                />
                <span>Instagram</span>
              </CButton>
              <CButton size="sm" className="btn-pinterest btn-brand mr-1 mb-1">
                <CIcon
                  content={cibPinterest}
                  name="cib-pinterest"
                />
                <span>Pinterest</span>
              </CButton>
              <CButton size="sm" className="btn-vk btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVk}
                  name="cib-vk"
                />
                <span>VK</span>
              </CButton>
              <CButton size="sm" className="btn-yahoo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYahoo}
                  name="cib-yahoo"
                />
                <span>Yahoo</span>
              </CButton>
              <CButton size="sm" className="btn-behance btn-brand mr-1 mb-1">
                <CIcon
                  content={cibBehance}
                  name="cib-behance"
                />
                <span>Behance</span>
              </CButton>
              <CButton size="sm" className="btn-reddit btn-brand mr-1 mb-1">
                <CIcon
                  content={cibReddit}
                  name="cib-reddit"
                />
                <span>Reddit</span>
              </CButton>
              <CButton size="sm" className="btn-vimeo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVimeo}
                  name="cib-vimeo"
                />
                <span>Vimeo</span>
              </CButton>
            </p>
            <h6>Size Normal</h6>
            <p>
              <CButton className="btn-facebook btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFacebook}
                  name="cib-facebook"
                />
                <span>Facebook</span>
              </CButton>
              <CButton className="btn-twitter btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTwitter}
                  name="cib-twitter"
                />
                <span>Twitter</span>
              </CButton>
              <CButton className="btn-linkedin btn-brand mr-1 mb-1">
                <CIcon
                  content={cibLinkedin}
                  name="cib-linkedin"
                />
                <span>LinkedIn</span>
              </CButton>
              <CButton className="btn-flickr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFlickr}
                  name="cib-flickr"
                />
                <span>Flickr</span>
              </CButton>
              <CButton className="btn-tumblr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTumblr}
                  name="cib-tumblr"
                />
                <span>Tumblr</span>
              </CButton>
              <CButton className="btn-xing btn-brand mr-1 mb-1">
                <CIcon
                  content={cibXing}
                  name="cib-xing"
                />
                <span>Xing</span>
              </CButton>
              <CButton className="btn-github btn-brand mr-1 mb-1">
                <CIcon
                  content={cibGithub}
                  name="cib-github"
                />
                <span>Github</span>
              </CButton>
              <CButton className="btn-stack-overflow btn-brand mr-1 mb-1">
                <CIcon
                  content={cibStackoverflow}
                  name="cib-stackoverflow"
                />
                <span>StackOverflow</span>
              </CButton>
              <CButton className="btn-youtube btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYoutube}
                  name="cib-youtube"
                />
                <span>YouTube</span>
              </CButton>
              <CButton className="btn-dribbble btn-brand mr-1 mb-1">
                <CIcon
                  content={cibDribbble}
                  name="cib-dribbble"
                />
                <span>Dribbble</span>
              </CButton>
              <CButton className="btn-instagram btn-brand mr-1 mb-1">
                <CIcon
                  content={cibInstagram}
                  name="cib-instagram"
                />
                <span>Instagram</span>
              </CButton>
              <CButton className="btn-pinterest btn-brand mr-1 mb-1">
                <CIcon
                  content={cibPinterest}
                  name="cib-pinterest"
                />
                <span>Pinterest</span>
              </CButton>
              <CButton className="btn-vk btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVk}
                  name="cib-vk"
                />
                <span>VK</span>
              </CButton>
              <CButton className="btn-yahoo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYahoo}
                  name="cib-yahoo"
                />
                <span>Yahoo</span>
              </CButton>
              <CButton className="btn-behance btn-brand mr-1 mb-1">
                <CIcon
                  content={cibBehance}
                  name="cib-behance"
                />
                <span>Behance</span>
              </CButton>
              <CButton className="btn-reddit btn-brand mr-1 mb-1">
                <CIcon
                  content={cibReddit}
                  name="cib-reddit"
                />
                <span>Reddit</span>
              </CButton>
              <CButton className="btn-vimeo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVimeo}
                  name="cib-vimeo"
                />
                <span>Vimeo</span>
              </CButton>
            </p>
            <h6>
              Size Large
              <small>
                {' '}
                Add this class
                <code>.btn-lg</code>
              </small>
            </h6>
            <p>
              <CButton size="lg" className="btn-facebook btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFacebook}
                  name="cib-facebook"
                />
                <span>Facebook</span>
              </CButton>
              <CButton size="lg" className="btn-twitter btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTwitter}
                  name="cib-twitter"
                />
                <span>Twitter</span>
              </CButton>
              <CButton size="lg" className="btn-linkedin btn-brand mr-1 mb-1">
                <CIcon
                  content={cibLinkedin}
                  name="cib-linkedin"
                />
                <span>LinkedIn</span>
              </CButton>
              <CButton size="lg" className="btn-flickr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFlickr}
                  name="cib-flickr"
                />
                <span>Flickr</span>
              </CButton>
              <CButton size="lg" className="btn-tumblr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTumblr}
                  name="cib-tumblr"
                />
                <span>Tumblr</span>
              </CButton>
              <CButton size="lg" className="btn-xing btn-brand mr-1 mb-1">
                <CIcon
                  content={cibXing}
                  name="cib-xing"
                />
                <span>Xing</span>
              </CButton>
              <CButton size="lg" className="btn-github btn-brand mr-1 mb-1">
                <CIcon
                  content={cibGithub}
                  name="cib-github"
                />
                <span>Github</span>
              </CButton>
              <CButton size="lg" className="btn-stack-overflow btn-brand mr-1 mb-1">
                <CIcon
                  content={cibStackoverflow}
                  name="cib-stackoverflow"
                />
                <span>StackOverflow</span>
              </CButton>
              <CButton size="lg" className="btn-youtube btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYoutube}
                  name="cib-youtube"
                />
                <span>YouTube</span>
              </CButton>
              <CButton size="lg" className="btn-dribbble btn-brand mr-1 mb-1">
                <CIcon
                  content={cibDribbble}
                  name="cib-dribbble"
                />
                <span>Dribbble</span>
              </CButton>
              <CButton size="lg" className="btn-instagram btn-brand mr-1 mb-1">
                <CIcon
                  content={cibInstagram}
                  name="cib-instagram"
                />
                <span>Instagram</span>
              </CButton>
              <CButton size="lg" className="btn-pinterest btn-brand mr-1 mb-1">
                <CIcon
                  content={cibPinterest}
                  name="cib-pinterest"
                />
                <span>Pinterest</span>
              </CButton>
              <CButton size="lg" className="btn-vk btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVk}
                  name="cib-vk"
                />
                <span>VK</span>
              </CButton>
              <CButton size="lg" className="btn-yahoo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYahoo}
                  name="cib-yahoo"
                />
                <span>Yahoo</span>
              </CButton>
              <CButton size="lg" className="btn-behance btn-brand mr-1 mb-1">
                <CIcon
                  content={cibBehance}
                  name="cib-behance"
                />
                <span>Behance</span>
              </CButton>
              <CButton size="lg" className="btn-reddit btn-brand mr-1 mb-1">
                <CIcon
                  content={cibReddit}
                  name="cib-reddit"
                />
                <span>Reddit</span>
              </CButton>
              <CButton size="lg" className="btn-vimeo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVimeo}
                  name="cib-vimeo"
                />
                <span>Vimeo</span>
              </CButton>
            </p>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Brand button
            <small> only icons</small>
          </CCardHeader>
          <CCardBody>
            <h6>
              Size Small
              <small>
                {' '}
                Add this class
                <code>.btn-sm</code>
              </small>
            </h6>
            <p>
              <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFacebook}
                  name="cib-facebook"
                />
              </CButton>
              <CButton size="sm" className="btn-twitter btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTwitter}
                  name="cib-twitter"
                />
              </CButton>
              <CButton size="sm" className="btn-linkedin btn-brand mr-1 mb-1">
                <CIcon
                  content={cibLinkedin}
                  name="cib-linkedin"
                />
              </CButton>
              <CButton size="sm" className="btn-flickr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFlickr}
                  name="cib-flickr"
                />
              </CButton>
              <CButton size="sm" className="btn-tumblr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTumblr}
                  name="cib-tumblr"
                />
              </CButton>
              <CButton size="sm" className="btn-xing btn-brand mr-1 mb-1">
                <CIcon
                  content={cibXing}
                  name="cib-xing"
                />
              </CButton>
              <CButton size="sm" className="btn-github btn-brand mr-1 mb-1">
                <CIcon
                  content={cibGithub}
                  name="cib-github"
                />
              </CButton>
              <CButton size="sm" className="btn-stack-overflow btn-brand mr-1 mb-1">
                <CIcon
                  content={cibStackoverflow}
                  name="cib-stackoverflow"
                />
              </CButton>
              <CButton size="sm" className="btn-youtube btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYoutube}
                  name="cib-youtube"
                />
              </CButton>
              <CButton size="sm" className="btn-dribbble btn-brand mr-1 mb-1">
                <CIcon
                  content={cibDribbble}
                  name="cib-dribbble"
                />
              </CButton>
              <CButton size="sm" className="btn-instagram btn-brand mr-1 mb-1">
                <CIcon
                  content={cibInstagram}
                  name="cib-instagram"
                />
              </CButton>
              <CButton size="sm" className="btn-pinterest btn-brand mr-1 mb-1">
                <CIcon
                  content={cibPinterest}
                  name="cib-pinterest"
                />
              </CButton>
              <CButton size="sm" className="btn-vk btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVk}
                  name="cib-vk"
                />
              </CButton>
              <CButton size="sm" className="btn-yahoo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYahoo}
                  name="cib-yahoo"
                />
              </CButton>
              <CButton size="sm" className="btn-behance btn-brand mr-1 mb-1">
                <CIcon
                  content={cibBehance}
                  name="cib-behance"
                />
              </CButton>
              <CButton size="sm" className="btn-reddit btn-brand mr-1 mb-1">
                <CIcon
                  content={cibReddit}
                  name="cib-reddit"
                />
              </CButton>
              <CButton size="sm" className="btn-vimeo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVimeo}
                  name="cib-vimeo"
                />
              </CButton>
            </p>
            <h6>Size Normal</h6>
            <p>
              <CButton className="btn-facebook btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFacebook}
                  name="cib-facebook"
                />
              </CButton>
              <CButton className="btn-twitter btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTwitter}
                  name="cib-twitter"
                />
              </CButton>
              <CButton className="btn-linkedin btn-brand mr-1 mb-1">
                <CIcon
                  content={cibLinkedin}
                  name="cib-linkedin"
                />
              </CButton>
              <CButton className="btn-flickr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFlickr}
                  name="cib-flickr"
                />
              </CButton>
              <CButton className="btn-tumblr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTumblr}
                  name="cib-tumblr"
                />
              </CButton>
              <CButton className="btn-xing btn-brand mr-1 mb-1">
                <CIcon
                  content={cibXing}
                  name="cib-xing"
                />
              </CButton>
              <CButton className="btn-github btn-brand mr-1 mb-1">
                <CIcon
                  content={cibGithub}
                  name="cib-github"
                />
              </CButton>
              <CButton className="btn-stack-overflow btn-brand mr-1 mb-1">
                <CIcon
                  content={cibStackoverflow}
                  name="cib-stackoverflow"
                />
              </CButton>
              <CButton className="btn-youtube btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYoutube}
                  name="cib-youtube"
                />
              </CButton>
              <CButton className="btn-dribbble btn-brand mr-1 mb-1">
                <CIcon
                  content={cibDribbble}
                  name="cib-dribbble"
                />
              </CButton>
              <CButton className="btn-instagram btn-brand mr-1 mb-1">
                <CIcon
                  content={cibInstagram}
                  name="cib-instagram"
                />
              </CButton>
              <CButton className="btn-pinterest btn-brand mr-1 mb-1">
                <CIcon
                  content={cibPinterest}
                  name="cib-pinterest"
                />
              </CButton>
              <CButton className="btn-vk btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVk}
                  name="cib-vk"
                />
              </CButton>
              <CButton className="btn-yahoo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYahoo}
                  name="cib-yahoo"
                />
              </CButton>
              <CButton className="btn-behance btn-brand mr-1 mb-1">
                <CIcon
                  content={cibBehance}
                  name="cib-behance"
                />
              </CButton>
              <CButton className="btn-reddit btn-brand mr-1 mb-1">
                <CIcon
                  content={cibReddit}
                  name="cib-reddit"
                />
              </CButton>
              <CButton className="btn-vimeo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVimeo}
                  name="cib-vimeo"
                />
              </CButton>
            </p>
            <h6>
              Size Large
              <small>
                {' '}
                Add this class
                <code>.btn-lg</code>
              </small>
            </h6>
            <p>
              <CButton size="lg" className="btn-facebook btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFacebook}
                  name="cib-facebook"
                />
              </CButton>
              <CButton size="lg" className="btn-twitter btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTwitter}
                  name="cib-twitter"
                />
              </CButton>
              <CButton size="lg" className="btn-linkedin btn-brand mr-1 mb-1">
                <CIcon
                  content={cibLinkedin}
                  name="cib-linkedin"
                />
              </CButton>
              <CButton size="lg" className="btn-flickr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibFlickr}
                  name="cib-flickr"
                />
              </CButton>
              <CButton size="lg" className="btn-tumblr btn-brand mr-1 mb-1">
                <CIcon
                  content={cibTumblr}
                  name="cib-tumblr"
                />
              </CButton>
              <CButton size="lg" className="btn-xing btn-brand mr-1 mb-1">
                <CIcon
                  content={cibXing}
                  name="cib-xing"
                />
              </CButton>
              <CButton size="lg" className="btn-github btn-brand mr-1 mb-1">
                <CIcon
                  content={cibGithub}
                  name="cib-github"
                />
              </CButton>
              <CButton size="lg" className="btn-stack-overflow btn-brand mr-1 mb-1">
                <CIcon
                  content={cibStackoverflow}
                  name="cib-stackoverflow"
                />
              </CButton>
              <CButton size="lg" className="btn-youtube btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYoutube}
                  name="cib-youtube"
                />
              </CButton>
              <CButton size="lg" className="btn-dribbble btn-brand mr-1 mb-1">
                <CIcon
                  content={cibDribbble}
                  name="cib-dribbble"
                />
              </CButton>
              <CButton size="lg" className="btn-instagram btn-brand mr-1 mb-1">
                <CIcon
                  content={cibInstagram}
                  name="cib-instagram"
                />
              </CButton>
              <CButton size="lg" className="btn-pinterest btn-brand mr-1 mb-1">
                <CIcon
                  content={cibPinterest}
                  name="cib-pinterest"
                />
              </CButton>
              <CButton size="lg" className="btn-vk btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVk}
                  name="cib-vk"
                />
              </CButton>
              <CButton size="lg" className="btn-yahoo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibYahoo}
                  name="cib-yahoo"
                />
              </CButton>
              <CButton size="lg" className="btn-behance btn-brand mr-1 mb-1">
                <CIcon
                  content={cibBehance}
                  name="cib-behance"
                />
              </CButton>
              <CButton size="lg" className="btn-reddit btn-brand mr-1 mb-1">
                <CIcon
                  content={cibReddit}
                  name="cib-reddit"
                />
              </CButton>
              <CButton size="lg" className="btn-vimeo btn-brand mr-1 mb-1">
                <CIcon
                  content={cibVimeo}
                  name="cib-vimeo"
                />
              </CButton>
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
);
