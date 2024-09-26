import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CButton } from '@coreui/react';
import Link from 'next/link';
import SnowboardGrab from '../../images/snowboard-grab.svg';

const HomeCTA: React.FC = () => (
  <div className="resort-stats-wrap">
    <div className="resort-stats text-center p-2">
      <div className="font-weight-700 h3">
        <FormattedMessage
          id="shredindex.homeCTA.RESORTS_COUNT"
          defaultMessage="{resortCount} resorts in"
          values={{
            resortCount: (chunks) => <span className="h2 text-info fw-bold">{chunks}</span>,
          }}
        />
      </div>
      <div className="font-weight-700 h3">
        <FormattedMessage
          id="shredindex.homeCTA.COUNTRIES_COUNT"
          defaultMessage="{countryCount} countries"
          values={{
            countryCount: (chunks) => <span className="h2 text-primary fw-bold">{chunks}</span>,
          }}
        />
      </div>
      <Link href="/resorts" passHref>
        <CButton className="m-4 text-white p-2 pe-4 ps-4" color="secondary">
          <FormattedMessage
            id="shredindex.homeCTA.BROWSE_RESORTS"
            defaultMessage="Browse resorts"
          />
        </CButton>
      </Link>
      <div className="mt-3">
        <span className="h4">
          <FormattedMessage
            id="shredindex.homeCTA.SKI_ONE_RESORT"
            defaultMessage="If you ski {one} resort a day, it'll take"
            values={{
              one: (chunks) => <span className="text-primary">{chunks}</span>,
            }}
          />
        </span>
        <div className="h4">
          <FormattedMessage
            id="shredindex.homeCTA.YEARS_TO_SHRED"
            defaultMessage="{years} to shred them all."
            values={{
              years: (chunks) => <span className="h4 text-info">{chunks}</span>,
            }}
          />
        </div>
      </div>
    </div>
    <div className="snowboard-grab-wrap">
      <div className="snowboard-grab d-flex justify-content-end">
        <SnowboardGrab alt="Snowboard Grab" />
      </div>
    </div>
  </div>
);

export default HomeCTA;
