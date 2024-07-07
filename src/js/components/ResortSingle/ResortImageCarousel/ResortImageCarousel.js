import React from 'react';
import Flickity from 'react-flickity-component';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { imageType } from '../../../types/types';
import flickityOptions from '../../config/flickity-options';
import resortImagePlaceholder from '../../../../images/resort-image-placeholder.svg';

const ResortImageCarousel = ({ images }) => {
  const options = {
    ...flickityOptions,
    isDraggable: true,
    prevNextButtons: false,
    contain: true,
    pageDots: false,
    imagesLoaded: true,
    cellAlign: 'left',
  };

  return (
    <div className="resort-single resort-single__image-carousel mb-4">
      <div className="h6 user-select-none mb-2">
        <FormattedMessage id="shredindex.resort.IMAGES" defaultMessage="Images" />
      </div>
      <Flickity
        className="carousel w-100 h-100 mb-4"
        elementType="div"
        options={options}
        disableImagesLoaded
        reloadOnUpdate
        static
      >
        {images.length > 0 ? (images.filter((img) => img.image?.path)
          .map(({
            image,
          }) => (
            <div key={image.id} className="resort-single__carousel-image-item-wrap gray-300-bg border-radius-medium">
              <img className="carousel__image-item border-radius-medium" src={image?.path} alt={image?.alt} />
            </div>
          ))) : (
          [<div
            key={1}
            className="resort-single__carousel-image-item-wrap gray-300-bg border-radius-medium"
          >
            <img
              className="carousel__image-item carousel__image--no-images"
              src={resortImagePlaceholder}
              alt="shred-index-resort-placeholder"
            />
          </div>,
          ]
        )}
      </Flickity>
    </div>
  );
};

ResortImageCarousel.propTypes = {
  images: PropTypes.arrayOf(imageType).isRequired,
};

export default ResortImageCarousel;
