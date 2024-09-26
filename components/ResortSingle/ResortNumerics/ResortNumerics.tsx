import React from 'react';
import { FormattedMessage } from 'react-intl';
import Flickity from 'react-flickity-component';
import Statistic from '../../Statistic/Statistic';
import flickityOptions from '../../../src/js/components/config/flickity-options';
import getUnit from '../../../hooks/getUnit';
import { CCard, CCardBody, CListGroup } from '@coreui/react';
import { Numeric } from '../../../types/resortTypes';

interface ResortNumericsProps {
  numerics: Numeric[];
}

const ResortNumerics: React.FC<ResortNumericsProps> = ({ numerics }) => {
  if (numerics?.length < 1) {
    return (
      <div className="resort-single-card-heading user-select-none mb-4">
        <FormattedMessage id="shredindex.statistics.NOSTATISTICSAVALIABLE" defaultMessage="No statistics available" />
      </div>
    );
  }

  const options = {
    ...flickityOptions,
    prevNextButtons: false,
    contain: true,
    cellAlign: 'left' as const,
    pageDots: false,
  };

  return (
    <div className="resort-single numeric-list mb-4">
      <h3 className="resort-single-card-heading user-select-none mb-2">
        <FormattedMessage id="shredindex.statistics.KEYINSIGHTS" defaultMessage="Key insights" />
      </h3>
      {numerics ? (
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
              <div key={id} className="numeric-list__numeric me-2">
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
      ) : (
        <CCard className="numerics-card">
          <CCardBody>
            <CListGroup>
              <p className="numerics caption-text">
                No available key insights
              </p>
            </CListGroup>
          </CCardBody>
        </CCard>
      )}
    </div>
  );
};

export default ResortNumerics;
