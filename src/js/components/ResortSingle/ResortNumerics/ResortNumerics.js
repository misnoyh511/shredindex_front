import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Flickity from 'react-flickity-component';
import { resortAttributeType } from '../../../types/types';
import Statistic from '../../Statistic/Statistic';
import flickityOptions from '../../config/flickity-options';
import getUnit from '../../../hooks/getUnit';

const ResortNumerics = ({
  numerics,
}) => {
  if (numerics?.length < 1) {
    return (
      <div className="resort-card__small-label user-select-none">
        <FormattedMessage id="shredindex.ratinglist.RESORT_IS_UNRATED" defaultMessage="Resort has no statistics" />
      </div>
    );
  }

  const options = {
    ...flickityOptions,
    prevNextButtons: false,
    contain: true,
    cellAlign: 'left',
    pageDots: false,
  };

  return (
    <div className="numeric-list">
      <div className="h6 user-select-none mb-2">
        <FormattedMessage id="shredindex.statistics.KEYINSIGHTS" defaultMessage="Key insights" />
      </div>
      <div className="numeric-list__list">
        <Flickity
          className="carousel w-100 h-100"
          elementType="div"
          options={options}
          disableImagesLoaded
          reloadOnUpdate
        >
          {numerics?.map(({
            id, title, name, value, type,
          }) => (
            <div key={id} className="numeric-list__numeric mb-3 me-2">
              <Statistic
                title={title}
                name={name}
                statistic={value}
                maxValue={type.max_value}
                unit={getUnit({ unit: type.unit })}
              />
            </div>
          ))}
        </Flickity>
      </div>
    </div>
  );
};

ResortNumerics.propTypes = {
  numerics: PropTypes.arrayOf(resortAttributeType).isRequired,
};

export default ResortNumerics;
