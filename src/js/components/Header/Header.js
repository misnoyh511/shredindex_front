import { cilMenu } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CContainer, CHeader, CHeaderToggler, CImage,
} from '@coreui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/logo.svg';
import HeaderMenuMain from '../HeaderMenuMain/HeaderMenuMain';
import ViewContext from '../ViewContext/ViewContext';

const Header = () => {
  const { showSidebar, setShowSidebar } = useContext(ViewContext);
  return (
    <CHeader className="header mb-4">
      <CContainer fluid className="header__container-main">
        <CHeaderToggler
          className="header__toggler ps-1 d-md-none"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <Link className="header__logo px-3 mx-auto mx-md-0" to="/">
          <CImage src={Logo} className="header__logo-image" name="logo" height="28" alt="Logo" />
        </Link>
        <HeaderMenuMain />
      </CContainer>
    </CHeader>
  );
};

export default Header;
