import React from 'react';
import { CLink } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import Rating from '../Rating/Rating';

interface ResortAttributeType {
  id: string;
  name: string;
  title: string;
  value: number;
}
interface RatingListProps {
  className?: string;
  ratings: ResortAttributeType[];
  label: string;
  labelMessageId: string;
  affiliateUrl: string;
}

const RatingList: React.FC<RatingListProps> = ({
  className,
  ratings,
  label,
  labelMessageId,
  affiliateUrl,
}) => {
  if (ratings.length < 1) {
    return (
      <div className="resort-card__small-label user-select-none">
        <FormattedMessage id="shredindex.ratinglist.RESORT_IS_UNRATED" defaultMessage="ResortSingle is unrated" />
      </div>
    );
  }

  return (
    <div className={`rating-list ${className || ''}`}>
      <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliateUrl}>
        <div className="resort-card__small-label user-select-none mb-2">
          <FormattedMessage id={labelMessageId} defaultMessage={label} />
        </div>
        <div className="rating-list__list-scroll">
          {ratings.map(({
            id,
            name,
            title,
            value,
          }) => (
            <div key={id} className="rating-list__rating mb-3 me-1">
              <Rating name={name} title={title} rating={value} />
            </div>
          ))}
        </div>
      </CLink>
    </div>
  );
};

export default RatingList;
