import { cilMenu } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import {
  CContainer, CHeader, CImage,
} from '@coreui/react';
import React from 'react';
import Logo from '../../images/logo.svg';
import mobileLogo from '../../images/s-i-logo-small-png.svg';
import ResortSearchAutosuggestSkeleton
  from '../../components/ResortSearchAutoSuggest/ResortSearchAutoSuggestSkeleton';

const Fallback = () => (
  <CHeader className="header">
    <CContainer fluid className="header__container-main d-flex align-items-center">
      <div className="d-flex align-items-center header-col-flex">
        <CIcon icon={cilMenu} size="lg" />
        <div className="header__logo px-3 d-none d-md-block">
          <CImage src={Logo} className="header__logo-image " name="logo" height="28" alt="Logo" />
        </div>
      </div>
      <div className="d-flex justify-content-center header-col-flex-search">
        <ResortSearchAutosuggestSkeleton />
      </div>
      <div className="d-flex justify-content-end header-col-flex">
        <div className="header__logo px-3 d-md-none" to="/">
          <CImage src={mobileLogo} className="header__logo-image" name="logo" height="28" alt="Logo" />
        </div>
      </div>
    </CContainer>
  </CHeader>
);

export default Fallback;
