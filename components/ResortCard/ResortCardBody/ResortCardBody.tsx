import React from 'react';
import { CLink } from '@coreui/react';
import { Resort, Score } from '../../../types/resortTypes';
import RatingList from '../../RatingList/RatingList';
import ResortCardCommentCarousel from '../ResortCardCommentCarousel/ResortCardCommentCarousel';
import ResortCardImageCarousel from '../ResortCardImageCarousel/ResortCardImageCarousel';
import ResortCardLocation from '../ResortCardLocation/ResortCardLocation';
import NumericList from '../../NumericList/NumericList';
import ShareButton from '../../ShareButton/ShareButton';
import ResortCardKeyInsight from '@/ResortCardKeyInsight/ResortCardKeyInsight';

const hasDistinctRatings = (highlights: Score[], lowlights: Score[]): boolean => {
  const highlightIds = new Set(highlights.map(h => h.id));
  const lowlightIds = new Set(lowlights.map(l => l.id));

  const overlap = [...highlightIds].filter(id => lowlightIds.has(id)).length;

  return overlap < Math.min(highlights.length, lowlights.length) / 2;
};

interface ResortCardBodyProps {
  resort: Resort;
}

const ResortCardBody: React.FC<ResortCardBodyProps> = ({
  resort: {
    url,
    title,
    affiliate_url,
    location,
    description,
    keyInsight,
    numerics,
    highlights,
    lowlights,
    resort_images,
    comments,
  },
}) => (
  <div className="resort-card__body">
    <div className="resort-card__content-0 w-100 d-inline-flex justify-content-between">
      <div className="resort-card__location-wrap">
        <div className="resort-card__location text-left d-inline-flex user-select-none">
          <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank"
                 href={affiliate_url}>
            <ResortCardLocation location={location}/>
          </CLink>
          <ShareButton title={title} resortUrl={url}/>
        </div>
        {description && (
          <div className="resort-card__description user-select-none">
            <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank"
                   href={affiliate_url}>
              <span className="m-0">
                {description}
              </span>
            </CLink>
          </div>
        )}
      </div>
    </div>
    {keyInsight && (
      <ResortCardKeyInsight key={'keyInsight'} keyInsight={keyInsight} />
    )}
    <div className="resort-card__content-wrap">
      {numerics?.length > 1 && (
        <div className="resort-card__content-1 mb-2 d-flex">
          <div className="w-100">
            <NumericList
              labelMessageId="shredindex.statistics.Statistics"
              label="Statistics"
              numerics={numerics}
            />
          </div>
        </div>
      )}
      <div className="resort-card__content-1 mb-2 d-flex">
        <div className="resort-card__sub-ratings-list me-2">
          {hasDistinctRatings(highlights, lowlights)
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
          <ResortCardImageCarousel images={resort_images}/>
        </div>
        <div className="resort-card__content-2 mb-2 d-flex">
          <div className="resort-card__sub-ratings-list me-2">
            {hasDistinctRatings(highlights, lowlights) && (
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

export default ResortCardBody;
