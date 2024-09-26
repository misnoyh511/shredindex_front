import React from 'react';
import { FormattedMessage } from 'react-intl';
import Flickity from 'react-flickity-component';
import Statistic from '../Statistic/Statistic';
import flickityOptions from '../../src/js/components/config/flickity-options';
import getUnit from '../../hooks/getUnit';
import breakpoints from '../../src/js/components/config/breakpoints';
import useWindowDimensions from '../../hooks/getWindowDimensions';

interface NumericType {
  id: string;
  title: string;
  name: string;
  value: number;
  type: {
    max_value: number;
    unit: string;
  };
}

interface NumericListProps {
  isMini?: boolean;
  numerics: NumericType[];
  label: string;
  labelMessageId: string;
}

const NumericList: React.FC<NumericListProps> = ({
  isMini = false,
  numerics,
  label,
  labelMessageId,
}) => {
  if (numerics?.length < 1) {
    return (
      <div className="resort-card__small-label user-select-none">
        <FormattedMessage id="shredindex.ratinglist.RESORT_IS_UNRATED" defaultMessage="ResortSingle has no statistics" />
      </div>
    );
  }

  const { width } = useWindowDimensions();

  const options = {
    ...flickityOptions,
    cellAlign: 'left',
    prevNextButtons: isMini && width < breakpoints.md,
    pageDots: false,
  };

  return (
    <div className="numeric-list">
      <div className="resort-card__small-label user-select-none mb-1">
        <FormattedMessage id={labelMessageId} defaultMessage={label} />
      </div>
      <div className="numeric-list__list">
        <Flickity
          className="carousel w-100 h-100"
          elementType="div"
          options={options}
          disableImagesLoaded
          reloadOnUpdate
          static
        >
          {numerics.map(({
            id,
            title,
            name,
            value,
            type,
          }) => (
            <div key={id} className="numeric-list__numeric mb-3 me-3">
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

export default NumericList;
