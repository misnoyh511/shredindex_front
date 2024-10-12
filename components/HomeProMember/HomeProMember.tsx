import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CButton, CContainer } from '@coreui/react';
import HomeMidSection from '../../images/homepage/second-hero-mid-mountain-desktop.svg';
import HeroTablet from '../../images/homepage/second-hero-mid-mountain-tablet.svg';
import HeroMobile from '../../images/homepage/second-hero-mid-mountain-mobile.svg';
import SkiGrabFlip from '../../images/ski-grab-flip.svg';
import ProMemberResortList from './ProMemberResortList';
import breakpoints from '../../src/js/components/config/breakpoints';
import { showLogin } from '../../atoms/showLogin';
import { useRecoilState } from 'recoil';

const HomeProMember: React.FC = () => {
  const [loginVisible, setLoginVisible] = useRecoilState(showLogin);

  return (
    <div className="home-pro-member">
      <div className="home-pro-member__image">
        <div className="home-pro-member__svg home-pro-member__svg--desktop top">
          <HomeMidSection/>
        </div>
        <div className="home-pro-member__svg home-pro-member__svg--desktop bottom bottom-0">
          <HomeMidSection/>
        </div>
        <div className="home-pro-member__svg home-pro-member__svg--tablet top">
          <HeroTablet/>
        </div>
        <div className="home-pro-member__svg home-pro-member__svg--tablet bottom bottom-0">
          <HeroTablet/>
        </div>
        <div className="home-pro-member__svg home-pro-member__svg--mobile top">
          <HeroMobile/>
        </div>
        <div className="home-pro-member__svg home-pro-member__svg--mobile bottom bottom-0">
          <HeroMobile/>
        </div>
      </div>
      <div className="home-pro-member__heading text-center w-100">
        <CContainer fluid style={{ maxWidth: `${breakpoints.xxl}px` }}>
          <h2 className="fw-bold">
          <span>
            <FormattedMessage
              id="shredindex.app.BECOMEA"
              defaultMessage="Become a"
            />
          </span>
            <span className="text-secondary">
            {' '}
              <FormattedMessage
                id="shredindex.app.PROMEMBER"
                defaultMessage="pro member"
              />
          </span>
          </h2>
          <div className="button-group align-items-center">
            <CButton
              className="p-2 pe-4 ps-4 m-2"
              color="secondary"
              onClick={() => setLoginVisible(!loginVisible)}
            >
              Become a pro member
            </CButton>
          </div>
          <div className="home-lifestyles-cards text-start w-100">
            <ProMemberResortList title="Hidden Gems"/>
            <ProMemberResortList title="Pro recommendations"/>
          </div>
          <div className="ski-grab-wrap">
            <div className="ski-grab d-flex justify-content-end">
              <SkiGrabFlip alt="Ski Grab Flip"/>
            </div>
          </div>
        </CContainer>
      </div>
    </div>
  );
};

export default HomeProMember;
