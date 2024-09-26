import classNames from 'classnames';
import React from 'react';
import useStaticMenu from '../../hooks/useStaticMenu';
import DynamicLink from '../DynamicLink/DynamicLink';
import { menuCode } from '../HeaderMenuMain/HeaderMenuMain';

const SidebarMenuMain = () => {
  const { items } = useStaticMenu(menuCode);

  if (!items.length) {
    return null;
  }

  return (
    items.map(({ title, url, isCurrent }) => (
      <li key={url} className="sidebar-nav__item c-sidebar-nav-item">
        <DynamicLink
          to={url}
          className={
            classNames(
              'nav-link',
              'sidebar-nav__link',
              'c-sidebar-nav-link',
              {
                'sidebar-nav__link--current': isCurrent,
              },
            )
          }
        >
          {title}
        </DynamicLink>
      </li>
    ))
  );
};

export default SidebarMenuMain;
