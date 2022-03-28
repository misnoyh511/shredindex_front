/* istanbul ignore file */
import { CCol, CNav, CRow } from '@coreui/react';
import React from 'react';
import useStaticMenu from '../../hooks/useStaticMenu';
import DynamicLink from '../DynamicLink/DynamicLink';

export const menuCode = 'footer-menu-main';

const FooterMenuMain = () => {
  const { items } = useStaticMenu(menuCode);

  if (!items.length) {
    return null;
  }

  return (
    <CRow>
      <CCol xs="12">
        <div className="p-4 border-0">
          <CNav className="justify-content-center">
            {items.map(({ title, url }) => (
              <DynamicLink key={url} to={url} className="text-light mx-2">
                { title }
              </DynamicLink>
            ))}
          </CNav>
        </div>
      </CCol>
    </CRow>
  );
};

export default FooterMenuMain;
