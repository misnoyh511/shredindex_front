import React from 'react';
import CIcon from '@coreui/icons-react';
import { CNavLink } from '@coreui/react';
import NavConfig from '../config/nav-config';

const SidebarItems = () => {
  const filtered = NavConfig.filter((item) => item.path !== '/');

  return filtered.map((item) => (
    <li key={item.path} className="c-sidebar-nav-item">
      <CNavLink to={item.path} className="c-sidebar-nav-link">
        <CIcon content={item.icon} className="mr-2" />
        {item.name}
      </CNavLink>
    </li>
  ));
};

export default SidebarItems;
