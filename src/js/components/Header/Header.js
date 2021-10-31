import CIcon from '@coreui/icons-react';
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
  CImage,
  CHeaderToggler,
  CContainer,
} from '@coreui/react';
import { cilMenu } from '@coreui/icons';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import Logo from '../../../images/logo.svg';
import routingConfig from '../config/routing-config';
import SubHeader from '../SubHeader/SubHeader';
import ViewContext from '../ViewContext/ViewContext';

const Header = () => {
  const { showSidebar, setShowSidebar } = useContext(ViewContext);
  return (
    <CHeader className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="header__toggler ps-1 d-lg-none"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="header__logo px-3 mx-auto mx-lg-0" href="/">
          <CImage src={Logo} className="header__logo-image" name="logo" height="28" alt="Logo" />
        </CHeaderBrand>
        <HeaderNav />
      </CContainer>
      <SubHeader />
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
        <CNavLink className="header-nav__link" href={item.path}>
          <CIcon icon={item.icon} className="header-nav__icon me-2" />
          <FormattedMessage
            id={item.name}
            defaultMessage={item.name}
          />
        </CNavLink>
      </CNavItem>
    )));
};

export default Header;
