import CIcon from '@coreui/icons-react';
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CImg,
  CToggler,
} from '@coreui/react';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import Logo from '../../../images/logo.svg';
import routingConfig from '../config/routing-config';
import SubHeader from '../SubHeader/SubHeader';
import ViewContext from '../ViewContext/ViewContext';

const Header = () => {
  const { showSidebar, setShowSidebar } = useContext(ViewContext);
  return (
    <CHeader withSubheader className="header">
      <CToggler
        inHeader
        className="header__toggler ml-md-3 d-lg-none"
        onClick={() => setShowSidebar(!showSidebar)}
      />
      <CHeaderBrand className="header__logo px-3 mx-auto mx-lg-0">
        <CHeaderNavLink className="header__logo-link" to="/">
          <CImg src={Logo} className="header__logo-image" name="logo" height="28" alt="Logo" />
        </CHeaderNavLink>
      </CHeaderBrand>
      <HeaderNav />
      <SubHeader />
    </CHeader>
  );
};

const HeaderNav = () => (
  <CHeaderNav className="header-nav d-md-down-none mr-auto">
    <HeaderNavItems />
  </CHeaderNav>
);

const HeaderNavItems = () => {
  const filtered = routingConfig.filter((item) => item.showInMenu);

  return (
    filtered.map((item) => (
      <CHeaderNavItem key={item.path} className="header-nav__item px-3">
        <CHeaderNavLink className="header-nav__link" to={item.path}>
          <CIcon content={item.icon} className="header-nav__icon mr-2" />
          <FormattedMessage
            id={item.name}
            defaultMessage={item.name}
          />
        </CHeaderNavLink>
      </CHeaderNavItem>
    )));
};

export default Header;
