import { cilShareAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React from 'react';
import { CLink } from '@coreui/react';
import { resortType } from '../../types/types';
import RatingList from '../RatingList/RatingList';
import ResortCardCommentCarousel from '../ResortCardCommentCarousel/ResortCardCommentCarousel';
import ResortImageCarousel from '../ResortCardImageCarousel/ResortImageCarousel';
import ResortCardLocation from '../ResortCardLocation/ResortCardLocation';
import NumericList from '../StatisticList/NumericList';

const isDifferentRatings = (a, b) => a.every(({ id }) => b.find((i) => i.id === id));

const ResortCardBody = ({
  resort: {
    affiliate_url,
    location,
    description,
    numerics,
    highlights,
    lowlights,
    resort_images,
    comments,
  },
}) => (

  <div className="resort-card__body">
    <div className="resort-card__content-0 mb-2 w-100 d-inline-flex justify-content-between">
      <div className="resort-card__location-wrap">
        <div className="resort-card__location text-left d-inline-flex user-select-none">
          <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliate_url}>
            <ResortCardLocation location={location} />
          </CLink>
        </div>
        {description && (
          <div className="resort-card__description mb-2 me-2 user-select-none">
            <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliate_url}>
              <span className="m-0">
                {description}
              </span>
            </CLink>
          </div>
        )}
      </div>
      <div className="resort-card__share-wrap me-2">
        <CIcon icon={cilShareAlt} />
      </div>
    </div>
    <div className="resort-card__content-wrap">
      <div className="resort-card__content-1 mb-2 d-flex">
        <div className="w-100">
          <NumericList
            labelMessageId="shredindex.ratinglist.HIGHLIGHTS"
            label="Statistics"
            numerics={numerics.filter((item) => ['Average Annual Snowfall','Vertical Drop','Skiable Terrain'].includes(item.title))}
            affiliateUrl={affiliate_url}
          />
        </div>
      </div>
      <div className="resort-card__content-1 mb-2 d-flex">
        <div className="resort-card__sub-ratings-list me-2">
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
                labelMessageId="shredindex.ratinglist.RATINGS"
                label="Ratings"
                ratings={highlights}
                affiliateUrl={affiliate_url}
              />
            )}
        </div>
        <ResortImageCarousel images={resort_images}/>
      </div>
      <div className="resort-card__content-2 mb-2 d-flex">
        <div className="resort-card__sub-ratings-list me-2">
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
        <ResortCardCommentCarousel comments={comments}/>
      </div>
    </div>
  </div>
);

ResortCardBody.propTypes = {
  resort: resortType.isRequired,
};

export default ResortCardBody;
