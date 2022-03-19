import { cilMenu } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CImage,
  CNavItem,
} from '@coreui/react';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Logo from '../../../images/logo.svg';
import routingConfig from '../config/routing-config';
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader';
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
        <HeaderNav />
      </CContainer>
      <CHeaderDivider />
      <SecondaryHeader />
    </CHeader>
  );
};

const HeaderNav = () => (
  <CHeaderNav className="header-nav d-none d-md-flex me-auto">
    <HeaderNavItems />
  </CHeaderNav>
);

const HeaderNavItems = () => {
  const filtered = routingConfig.filter((item) => item.showInMenu);

  return (
    filtered.map((item) => (
      <CNavItem key={item.path} className="header-nav__item px-3">
        <Link className="header-nav__link" to={item.path}>
          <CIcon icon={item.icon} className="header-nav__icon me-2" />
          <FormattedMessage
            id={item.name}
            defaultMessage={item.name}
          />
        </Link>
      </CNavItem>
    )));
};

export default Header;
