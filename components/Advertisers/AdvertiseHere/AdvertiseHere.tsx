import React from 'react';
import { CButton, CCard, CCardBody } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { AffiliateUrl } from '../../../types/resortTypes';
import Link from 'next/link';
import Image from 'next/image';
import AdvertiseHereImage from '../../../images/AdvertiseHere.png';

const AdvertiseHere: React.FC <AffiliateUrl> = ({ affiliateUrl }) => {
  return (
  <>
    <div className="resort-single-card-heading user-select-none">
      <FormattedMessage id="shredindex.resort.ADVERTISEHERE" defaultMessage="Advertise"/>
    </div>
    <CCard className="resort-single__advertise resort__advertise-card mb-4">
      <CCardBody>
        <Link href={affiliateUrl || ''} target="_blank">
          <Image
            className="carousel__image-item border-radius-medium position-relative"
            src={AdvertiseHereImage}
            alt="Advertise image"
            layout="fill"
            objectFit="fill"
          />
        </Link>
        &nbsp;
        <p className="caption-text">
          Have a local business or a ski package to offer? &nbsp;
        </p>
        <CButton color="secondary" href={affiliateUrl} className="w-100" target="_blank">
            <span >Get in touch with us</span>
        </CButton>
      </CCardBody>
    </CCard>
  </>
  );
};

export default AdvertiseHere;
