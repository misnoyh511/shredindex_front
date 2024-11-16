import React from 'react';
import { CButton, CCard, CCardBody } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import Link from 'next/link';
import { AffiliateUrl } from '../../../types/resortTypes';
import LuxuryAccomodation from '../../../images/accomodation-luxury.webp';
import { CIcon } from '@coreui/icons-react';
import { cilExternalLink, cilMap, cilUser } from '@coreui/icons';

const Accomodation: React.FC <AffiliateUrl> = ({ affiliateUrl }) => (
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
            <h4 className="fw-bold mb-2">Find Your Perfect Stay </h4>
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
  </>
)
;

export default Accomodation;
