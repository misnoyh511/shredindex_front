import React, { useContext } from 'react';
import {
  CHeader,
  CToggler,
} from '@coreui/react';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import SubHeader from '../SubHeader/SubHeader';

import ViewContext from '../ViewContext/ViewContext';

const Header = () => {
  const { toggleNav, setToggleNav } = useContext(ViewContext);
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={() => setToggleNav(!toggleNav)}
      />
      <HeaderNavigation />
      <SubHeader />
    </CHeader>
  );
};

export default Header;
