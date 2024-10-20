import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CIcon } from '@coreui/icons-react';
import { cilCheck, cilX } from '@coreui/icons';
import Flickity from 'react-flickity-component';
import flickityOptions from '../../../src/js/components/config/flickity-options';
import { Generic } from '../../../types/resortTypes';

interface ResortGenericsProps {
  generics: Generic[];
}

const options = {
  ...flickityOptions,
  prevNextButtons: false,
  contain: true,
  cellAlign: 'left',
  pageDots: false,
};

const ResortGenerics: React.FC<ResortGenericsProps> = ({ generics }) => (
  <div className="resort-single__generics generics numeric-list mb-4">
    <h3 className="resort-single-card-heading user-select-none mb-2">
      <FormattedMessage
        id="shredindex.generics.FEATURES"
        defaultMessage="Features"
      />
    </h3>
    <div className="numeric-list__list">
      <Flickity
        className="carousel w-100 h-100"
        elementType="div"
        options={options}
        disableImagesLoaded
        reloadOnUpdate
      >
        {generics?.map(({ id, title, value }) => (
          <div key={id} className="generic-list__generic generics-item me-2">
            {value === 'yes'
              ? <CIcon icon={cilCheck} size="sm" />
              : <CIcon icon={cilX} size="sm" />}
            <span>{` ${title}`}</span>
          </div>
        ))}
      </Flickity>
    </div>
  </div>
);

export default ResortGenerics;
