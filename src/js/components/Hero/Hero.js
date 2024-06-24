import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CButton } from '@coreui/react';
import { ReactComponent as HeroDesktop } from '../../../images/Hero-Desktop.svg';
import { ReactComponent as HeroTablet } from '../../../images/Hero-Tablet.svg';
import { ReactComponent as HeroMobile } from '../../../images/Hero-Mobile.svg';

const Hero = () => (
  <div className="hero">
    <div className="hero__image">
      <div className="hero__svg hero__svg--desktop">
        <HeroDesktop />
      </div>
      <div className="hero__svg hero__svg--tablet">
        <HeroTablet />
      </div>
      <div className="hero__svg hero__svg--mobile">
        <HeroMobile />
      </div>
    </div>
    <div className="hero__heading">
      <h1>
        <FormattedMessage
          id="shredindex.app.SUBTITLE"
          defaultMessage="Live your best adventure lifestyle."
        />
      </h1>
      <div className="button-group d-flex align-items-start">
        <CButton className="me-2" color="secondary" variant="">Explore resorts</CButton>
        {/* <CButton className="me-2" color="warning" variant="">Become a member</CButton> */}
      </div>
    </div>
  </div>
);

export default Hero;
