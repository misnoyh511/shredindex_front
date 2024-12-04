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
  const accommodationId = 'accommodation-section';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 300;
      setIsSticky(scrollPosition > threshold);
    };

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  const StickyFooter = () => (
    <div
      role="complementary"
      aria-label="Quick accommodation booking"
      className={`accomodation-wrap position-fixed bottom-0 start-0 w-100 text-white p-3 ${
        (!isMobile && !isSticky) ? 'd-none' : ''
      }`}
      style={{
        zIndex: 1000,
        background: 'rgba(44, 56, 74, 0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center gap-2">
          <div className="d-flex flex-column" style={{ maxWidth: '60%' }}>
            <h2 className="h5 fw-bold mb-1">
              {isMobile ? 'Accommodation' : 'Find Your Perfect Stay'}
            </h2>
            <span className="text-white-50 small">Multiple locations near slopes</span>
          </div>
          <CButton
            color="primary"
            shape="rounded-pill"
            className="px-3"
            href={affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            size={'lg'}
            style={{
              border: 'none',
              minWidth: !isMobile ? '188px' : '140px',
            }}
            aria-label="View available properties on booking platform (opens in new tab)"
          >
            <span className="me-2">
            {isMobile ? 'View' : 'View Available Properties'}
            </span>
            <CIcon icon={cilExternalLink} className="w-4 h-4" aria-hidden="true"/>
          </CButton>
        </div>
      </div>
    </div>
  );

  return (
    <section
      aria-labelledby={accommodationId}
      className="accommodation-section"
    >
      <h2
        id={accommodationId}
        className="resort-single-card-heading user-select-none"
      >
        <FormattedMessage id="shredindex.resort.ACCOMMODATION" defaultMessage="Accommodation" />
      </h2>
      <CCard className="resort-single__accomodation resort__accomodation-card mb-4">
        <CCardBody>
          <Link
            href={affiliateUrl || '#'}
            target="_blank"
            rel="sponsored noopener noreferrer"
            aria-label="View accommodation photos and details (opens in new tab)"
          >
            <Image
              className="carousel__image-item border-radius-medium position-relative"
              src={LuxuryAccomodation}
              alt="Preview of available accommodation options"
              fill={true}
              priority
            />
          </Link>
          <div>
            <div className="d-flex justify-content-between align-items-start mb-2 flex-column">
              <h3 className="fw-bold mb-2 h4 pt-3">Find Your Perfect Stay</h3>
              <ul
                className="p-0 small fw-lighter mb-2"
                aria-label="Accommodation features"
              >
                <li className="d-flex align-items-center gap-2">
                  <CIcon icon={cilUser} className="w-4 h-4" aria-hidden="true"/>
                  <span>Various room types available</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <CIcon icon={cilMap} className="w-4 h-4" aria-hidden="true"/>
                  <span>Multiple locations near slopes</span>
                </li>
              </ul>
            </div>
            <CButton
              color="primary"
              href={affiliateUrl}
              className="w-100 mt-2"
              target="_blank"
              rel="sponsored noopener noreferrer"
              aria-label="View available properties on booking platform (opens in new tab)"
            >
              View Available Properties
              <CIcon icon={cilExternalLink} className="ms-2 w-4 h-4" aria-hidden="true"/>
            </CButton>
            <p className="small fw-lighter text-center mt-2 text-muted" role="note">
              You&apos;ll be redirected to Booking.com or Expedia.com to complete your reservation
            </p>
          </div>
        </CCardBody>
      </CCard>
      <StickyFooter />
      {isMobile && <div className="pb-5" aria-hidden="true" />}
    </section>
  );
};

export default Accommodation;
