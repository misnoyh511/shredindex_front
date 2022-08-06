import PropTypes from 'prop-types';
import React from 'react';
import { CLink } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { resortAttributeType } from '../../types/types';
import Rating from '../Rating/Rating';

const RatingList = ({
  ratings, label, labelMessageId, affiliateUrl,
}) => {
  if (ratings.length < 1) {
    return (
      <div className="resort-card__small-label user-select-none">
        <FormattedMessage id="shredindex.ratinglist.RESORT_IS_UNRATED" defaultMessage="Resort is unrated" />
      </div>
    );
  }

  return (
    <div className="rating-list">
      <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliateUrl}>
        <div className="resort-card__small-label user-select-none">
          <FormattedMessage id={labelMessageId} defaultMessage={label} />
        </div>
        <div className="rating-list__list-scroll">
          {ratings.map(({ id, title, value }) => (
            <div key={id} className="rating-list__rating mb-3 me-1">
              <Rating title={title} rating={value} />
            </div>
          ))}
        </div>
      </CLink>
    </div>
  );
};

RatingList.propTypes = {
  ratings: PropTypes.arrayOf(resortAttributeType).isRequired,
  label: PropTypes.string.isRequired,
  labelMessageId: PropTypes.string.isRequired,
  affiliateUrl: PropTypes.string.isRequired,
};

export default RatingList;
