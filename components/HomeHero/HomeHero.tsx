import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CButton } from '@coreui/react';
import Link from 'next/link';
import HeroDesktop from '../../images/homepage/hero-desktop.svg';
import HeroTablet from '../../images/homepage/hero-tablet.svg';
import HeroMobile from '../../images/homepage/hero-mobile.svg';
import { useRecoilState } from 'recoil';
import { showMembershipTray } from '../../atoms/showMembershipTray';

const HomeHero = () => {
  const [membershipVisible, setMembershipVisible] = useRecoilState(showMembershipTray);

  return (
    <div className="hero">
      <div className="hero__image">
        <div className="hero__svg hero__svg--desktop">
          <HeroDesktop/>
        </div>
        <div className="hero__svg hero__svg--tablet">
          <HeroTablet/>
        </div>
        <div className="hero__svg hero__svg--mobile">
          <HeroMobile/>
        </div>
      </div>
      <div className="hero__heading">
        <h1>
          <FormattedMessage
            id="shredindex.app.SUBTITLE"
            defaultMessage="Live your best adventure lifestyle."
          />
        </h1>
        <div className="button-group d-flex align-items-start flex-wrap gap-3">
          <Link
            href="resorts"
          >
            <CButton className="p-2 pe-4 ps-4" color="secondary">Explore resorts</CButton>
          </Link>
          <CButton
            className="p-2 pe-4 ps-4"
            color="warning"
            onClick={() => setMembershipVisible(!membershipVisible)}
          >Become a member</CButton>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
