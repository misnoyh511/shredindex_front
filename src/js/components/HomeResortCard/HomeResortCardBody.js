import React from 'react';
import { CLink } from '@coreui/react';
import { resortType } from '../../types/types';
import RatingList from '../RatingList/RatingList';
import ResortCardLocation from '../ResortCard/ResortCardLocation/ResortCardLocation';
import NumericList from '../NumericList/NumericList';
import ShareButton from '../ShareButton/ShareButton';

const isDifferentRatings = (a, b) => a.every(({ id }) => b.find((i) => i.id === id));

const HomeResortCardBody = ({
  resort: {
    title,
    url,
    affiliate_url,
    location,
    description,
    numerics,
    highlights,
    lowlights,
  },
}) => (

  <div className="resort-card__body">
    <div className="resort-card__content-0 w-100 d-inline-flex justify-content-between">
      <div className="resort-card__location-wrap">
        <div className="resort-card__location text-left d-inline-flex user-select-none">
          <CLink
            className="resort-card__affiliate-link link-unstyled"
            rel="noreferrer noopener"
            target="_blank"
            href={affiliate_url}
          >
            <ResortCardLocation location={location} />
          </CLink>
        </div>
        {description && (
          <div className="resort-card__description mb-3 me-2 user-select-none">
            <CLink
              className="resort-card__affiliate-link link-unstyled"
              rel="noreferrer noopener"
              target="_blank"
              href={affiliate_url}
            >
              <span className="m-0">
                {description}
              </span>
            </CLink>
          </div>
        )}
      </div>
      <ShareButton key={title} title={title} resortUrl={url} />
    </div>
    <div className="resort-card__content-wrap">
      {numerics?.length > 1 && (
        <div className="resort-card__content-1 mb-2 d-flex">
          <div className="w-100">
            <NumericList
              labelMessageId="shredindex.ratinglist.STATISTICS"
              label="Statistics"
              numerics={numerics}
            />
          </div>
        </div>
      )}
    </div>
    <div className="resort-card__content-home mb-2 d-flex gap-2">
      {!isDifferentRatings(highlights, lowlights)
        ? (
          <RatingList
            labelMessageId="shredindex.ratinglist.HIGHLIGHTS"
            label="Highlights"
            ratings={highlights.slice(0, 3)}
            affiliateUrl={affiliate_url}
          />
        ) : (
          <RatingList
            className="w-100"
            labelMessageId="shredindex.ratinglist.RATINGS"
            label="Ratings"
            ratings={highlights}
            affiliateUrl={affiliate_url}
          />
        )}
      {!isDifferentRatings(highlights, lowlights) && (
      <RatingList
        labelMessageId="shredindex.ratinglist.LOWLIGHTS"
        label="Lowlights"
        ratings={lowlights.slice()
          .sort((a, b) => (a.value > b.value ? -1 : 1))}
        affiliateUrl={affiliate_url}
      />
      )}
    </div>
  </div>
);

HomeResortCardBody.propTypes = {
  resort: resortType.isRequired,
};

export default HomeResortCardBody;
