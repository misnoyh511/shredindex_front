import { cilShareAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React from 'react';
import { CLink } from '@coreui/react';
import { resortType } from '../../types/types';
import RatingList from '../RatingList/RatingList';
import ResortCardLocation from '../ResortCardLocation/ResortCardLocation';
import NumericList from '../StatisticList/NumericList';

const ResortCardBody = ({
  resort: {
    affiliate_url,
    location,
    description,
    numerics,
    highlights,
  },
}) => (

  <div className="resort-card__body">
    <div className="resort-card__content-0 w-100 d-inline-flex justify-content-between">
      <div className="resort-card__location-wrap">
        <div className="resort-card__location text-left d-inline-flex user-select-none">
          <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliate_url}>
            <ResortCardLocation location={location} />
          </CLink>
        </div>
        {description && (
          <div className="resort-card__description mb-3 me-2 user-select-none">
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
      {numerics?.length > 1 && (
        <div className="resort-card__content-1 mb-2 d-flex">
          <div className="w-100">
            <NumericList
              isMini
              labelMessageId="shredindex.ratinglist.STATISTICS"
              label="Statistics"
              numerics={numerics}
            />
          </div>
        </div>
      )}
      <div className="resort-card__content-1 mb-2">
        <div className="resort-card__sub-ratings-list">
          <RatingList
            labelMessageId="shredindex.ratinglist.HIGHLIGHTS"
            label="Highlights"
            ratings={highlights.slice(0, 3)}
            affiliateUrl={affiliate_url}
          />
        </div>
      </div>
    </div>
  </div>
);

ResortCardBody.propTypes = {
  resort: resortType.isRequired,
};

export default ResortCardBody;
