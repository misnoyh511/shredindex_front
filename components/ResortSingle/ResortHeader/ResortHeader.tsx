import React from 'react';
import {
  CCard, CCardBody, CCardHeader,
} from '@coreui/react';
import Link from 'next/link';
import ResortCardHeader from '../../ResortCard/ResortCardHeader/ResortCardHeader';
import ResortCardLocation from '../../ResortCard/ResortCardLocation/ResortCardLocation';
import ShareButton from '../../ShareButton/ShareButton';
import { ResortAttribute } from '../../../types/types';
import ResortDescription from '@/ResortSingle/ResortHeader/ResortDescription/ResortDescription';

interface Country {
  name: string;
  code: string;
}

interface State {
  name: string;
  code: string;
}

interface Location {
  country: Country;
  state: State;
}

interface Resort {
  title: string;
  affiliate_url: string;
  total_score: ResortAttribute;
  location: Location;
  description?: string;
}

interface ResortHeaderProps {
  resort: Resort;
}

const ResortHeader: React.FC<ResortHeaderProps> = ({ resort }) => {
  const {
    title,
    affiliate_url,
    total_score,
    location,
    description,
  } = resort;

  const headerId = `resort-header-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <CCard
      className="resort-header pt-2 mb-4"
      role="region"
      aria-labelledby={headerId}
    >
      <CCardHeader className="resort-card__header-wrap pb-0">
        <Link
          className="resort-card__affiliate-link link-unstyled"
          rel="noreferrer noopener"
          target="_blank"
          href={affiliate_url || '#'}
          aria-label={`Visit ${title}'s website`}
        >
          <ResortCardHeader
            title={title}
            totalScore={total_score}
            id={headerId}
            headingLevel="h1"
          />
        </Link>
      </CCardHeader>
      <CCardBody>
        <div
          className="resort-card__content-0 w-100 d-inline-flex justify-content-between"
          role="complementary"
          aria-label="Resort details"
        >
          <div
            className="resort-card__location-wrap"
            role="group"
            aria-label="Location and description"
          >
            <div className="resort-card__location text-left d-inline-flex user-select-none">
              <Link
                className="resort-card__affiliate-link link-unstyled"
                rel="noreferrer noopener"
                target="_blank"
                href={affiliate_url || '#'}
                aria-label={`View ${title} location details`}
              >
                <ResortCardLocation location={location} />
              </Link>
              <ShareButton
                title={title}
                aria-label={`Share ${title}`}
              />
            </div>
            <ResortDescription
              description={description}
              affiliateUrl={affiliate_url}
              aria-label={`About ${title}`}
            />
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default ResortHeader;
