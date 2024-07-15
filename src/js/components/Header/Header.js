import { cilMenu } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CContainer, CHeader, CHeaderToggler, CImage,
} from '@coreui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/logo.svg';
import mobileLogo from '../../../images/s-i-logo-small-png.svg';
import HeaderMenuMain from '../HeaderMenuMain/HeaderMenuMain';
import ViewContext from '../ViewContext/ViewContext';
import ResortSearchAutosuggest from '../ResortSearchAutoSuggest/ResortSearchAutoSuggest';

const Header = () => {
  const { showSidebar, setShowSidebar } = useContext(ViewContext);
  return (
    <CHeader className="header">
      <CContainer fluid className="header__container-main d-flex align-items-center">
        <div className="d-flex align-items-center header-col-flex">
          <CHeaderToggler
            className="header__toggler ps-1 d-md-none"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <Link className="header__logo px-3 d-none d-md-block" to="/">
            <CImage src={Logo} className="header__logo-image" name="logo" height="28" alt="Logo" />
          </Link>
          <HeaderMenuMain />
        </div>
        <div className="d-flex justify-content-center header-col-flex-search">
          <ResortSearchAutosuggest />
        </div>
        <div className="d-flex justify-content-end header-col-flex">
          <Link className="header__logo px-3 d-md-none" to="/">
            <CImage src={mobileLogo} className="header__logo-image" name="logo" height="28" alt="Logo" />
          </Link>
        </div>
      </CContainer>
    </CHeader>
  );
};

export default Header;
