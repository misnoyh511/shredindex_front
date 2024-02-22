import PropTypes from 'prop-types';
import React from 'react';
import { CLink } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { resortAttributeType } from '../../types/types';
import Statistic from '../Statistic/Statistic';

const NumericList = ({
  numerics, label, labelMessageId, affiliateUrl,
}) => {
  if (numerics?.length < 1) {
    return (
      <div className="resort-card__small-label user-select-none">
        <FormattedMessage id="shredindex.ratinglist.RESORT_IS_UNRATED" defaultMessage="Resort has no statistics" />
      </div>
    );
  }

  return (
    <div className="numeric-list">
      <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank" href={affiliateUrl}>
        <div className="resort-card__small-label user-select-none">
          <FormattedMessage id={labelMessageId} defaultMessage={label} />
        </div>
        <div className="numeric-list__list">
          {numerics.map(({
            id, title, value, max_value, unit,
          }) => (
            <div key={id} className="numeric-list__numeric mb-3 me-1 w-100">
              <Statistic title={title} statistic={value} maxValue={max_value} unit={unit} />
            </div>
          ))}
        </div>
      </CLink>
    </div>
  );
};

NumericList.propTypes = {
  numerics: PropTypes.arrayOf(resortAttributeType).isRequired,
  label: PropTypes.string.isRequired,
  labelMessageId: PropTypes.string.isRequired,
  affiliateUrl: PropTypes.string.isRequired,
};

export default NumericList;
