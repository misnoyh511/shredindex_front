import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as HeroDesktop } from '../../../images/Hero-Desktop.svg';
import { ReactComponent as HeroMobile } from '../../../images/Hero-Mobile.svg';
import {
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react';

const Hero = () => (
  <div className="hero">
    <div className="hero__image">
      <HeroDesktop />
      {/* <HeroDesktop /> */}
    </div>
    <div className="hero__heading">
      <h1>
        <FormattedMessage
          id="shredindex.app.SUBTITLE"
          defaultMessage="Live your best adventure lifestyle."
        />
      </h1>
    </div>
    <div className="d-flex align-items-start">
      <CButton label={'Explore resorts'} className="me-2" variant="">Explore resorts</CButton>
      <CButton label="Become a member" className="me-2" variant="">Become a member</CButton>
    </div>
  </div>
);

export default Hero;
