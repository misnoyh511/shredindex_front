import React from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import Link from 'next/link';
import { AffiliateUrl } from '../../../types/resortTypes';
import LuxuryAccomodation from '../../../images/accomodation-luxury.webp';

const Accomodation: React.FC <AffiliateUrl> = ({ affiliateUrl }) => (
  <>
    <h3 className="resort-single-card-heading user-select-none mb-2">
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
        <p className="h6 user-select-none mb-2 caption-text">
          Find your ideal &nbsp;
          <Link href={affiliateUrl} target="_blank">
            accomodation..
          </Link>
        </p>
      </CCardBody>
    </CCard>
  </>
);

export default Accomodation;
