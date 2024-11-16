import React from 'react';
import { FormattedMessage } from 'react-intl';
import Flickity from 'react-flickity-component';
import flickityOptions from '../../../src/js/components/config/flickity-options';
import { Generic } from '../../../types/resortTypes';
import { TypeIcon } from '@/Icons/TypeIcon';
import { TypeDescription } from '@/TypeDescription/TypeDescription';

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
    <h3 className="resort-single-card-heading user-select-none">
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
        {generics?.map(({ id, title, name }) => (
          <div key={id} className="generic-list__generic generics-item me-2">
            <div className={'d-inline-flex gap-2 align-items-center'}>
              <TypeIcon className="statistic__icon" typeName={name} size={'2rem'}/>
              <div>
                <span> {` ${title}`}</span>
                <div className="generic-description fw-light small mt-1 text-muted">
                  <TypeDescription label={name} />.
                </div>
              </div>
            </div>
          </div>
        ))}
      </Flickity>
    </div>
  </div>
);

export default ResortGenerics;
