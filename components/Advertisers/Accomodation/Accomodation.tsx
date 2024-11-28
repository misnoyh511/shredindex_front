import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import Link from 'next/link';
import { AffiliateUrl } from '../../../types/resortTypes';
import LuxuryAccomodation from '../../../images/accomodation-luxury.webp';
import { CIcon } from '@coreui/icons-react';
import { cilExternalLink, cilMap, cilUser } from '@coreui/icons';
import useWindowDimensions from '../../../hooks/getWindowDimensions';
import breakpoints from '../../../src/js/components/config/breakpoints';

const Accommodation: React.FC<AffiliateUrl> = ({ affiliateUrl }) => {
  const [isSticky, setIsSticky] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.md;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 300;
      setIsSticky(scrollPosition > threshold);
    };

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  // Sticky footer with improved layout
  const StickyFooter = () => (
    <div
      className={`accomodation-wrap position-fixed bottom-0 start-0 w-100 text-white p-3 ${
        (!isMobile && !isSticky) ? 'd-none' : ''
      }`}
      style={{
        zIndex: 1000,
        background: 'rgba(44, 56, 74, 0.95)', // CoreUI dark color with opacity
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center gap-2">
          <div className="d-flex flex-column" style={{ maxWidth: '60%' }}>
            <h4 className="h5 fw-bold mb-1">{isMobile ? 'Accomodation' : 'Find Your Perfect Stay'}</h4>
            <span className="text-white-50 small">Multiple locations near slopes</span>
          </div>
          <CButton
            color="primary"
            shape="rounded-pill"
            className="px-3"
            href={affiliateUrl}
            target="_blank"
            size={'lg'}
            style={{
              border: 'none',
              minWidth: !isMobile ? '188px' : '140px',
            }}
          >
            {isMobile ? 'Reserve' : 'View Available Properties'}
            <CIcon icon={cilExternalLink} className="ms-2 w-4 h-4"/>
          </CButton>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <h3 className="resort-single-card-heading user-select-none">
        <FormattedMessage id="shredindex.resort.ACCOMMODATION" defaultMessage="Accommodation" />
      </h3>
      <CCard className="resort-single__accomodation resort__accomodation-card mb-4">
        <CCardBody>
          <Link href={affiliateUrl || ''} target="_blank">
            <Image
              className="carousel__image-item border-radius-medium position-relative"
              src={LuxuryAccomodation}
              alt="Accommodation image"
              layout="fill"
              objectFit="fill"
            />
          </Link>
          &nbsp;
          <div>
            <div className="d-flex justify-content-between align-items-start mb-2 flex-column">
              <h4 className="fw-bold mb-2">Find Your Perfect Stay</h4>
              <ul className="p-0 small fw-lighter mb-2">
                <li className="d-flex align-items-center gap-2">
                  <CIcon icon={cilUser} className="w-4 h-4"/>
                  <span>Various room types available</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <CIcon icon={cilMap} className="w-4 h-4"/>
                  <span>Multiple locations near slopes</span>
                </li>
              </ul>
            </div>
            <CButton color="primary" href={affiliateUrl} className="w-100 mt-2" target="_blank">
              View Available Properties <CIcon icon={cilExternalLink} className="w-4 h-4"/>
            </CButton>
            <p className="small fw-lighter text-center mt-2 text-muted">
              You&apos;ll be redirected to Booking.com or Trip.com to complete your reservation
            </p>
          </div>
        </CCardBody>
      </CCard>
      <StickyFooter />
      {isMobile && <div className="pb-5" />}
    </>
  );
};

export default Accommodation;
