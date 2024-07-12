import React from 'react';
import Flickity from 'react-flickity-component';
import PropTypes from 'prop-types';
import resortImagePlaceholder from '../../../../images/resort-image-placeholder.svg';
import { imageType } from '../../../types/types';
import flickityOptions from '../../config/flickity-options';

const ResortCardImageCarousel = ({ showOneImage, images }) => {
  const filteredImages = images.filter((img) => img.image?.path);
  const imagesToShow = showOneImage ? filteredImages.slice(0, 1) : filteredImages;

  const options = {
    ...flickityOptions,
    prevNextButtons: !showOneImage && imagesToShow.length > 1,
    pageDots: !showOneImage && imagesToShow.length > 1,
  };

  if (showOneImage || imagesToShow.length === 1) {
    return (
      <div className="resort-card__image-carousel">
        <div className="single-image-container w-100 h-100 gray-300-bg border-radius-medium">
          {imagesToShow.length > 0 ? (
            <img
              className="carousel__image"
              src={imagesToShow[0].image.path}
              alt={imagesToShow[0].alt}
            />
          ) : (
            <img
              className="carousel__image single-image--no-images"
              src={resortImagePlaceholder}
              alt="shred-index-resort-placeholder"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="resort-card__image-carousel">
      <Flickity
        className="carousel w-100 h-100 gray-300-bg border-radius-medium"
        elementType="div"
        options={options}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        {imagesToShow.length > 0 ? imagesToShow.map(({ id, alt, image }) => (
          <img key={id} className="carousel__image" src={image.path} alt={alt} />
        )) : (
          <img
            className="carousel__image--no-images"
            src={resortImagePlaceholder}
            alt="shred-index-resort-placeholder"
          />
        )}
      </Flickity>
    </div>
  );
};

ResortCardImageCarousel.propTypes = {
  images: PropTypes.arrayOf(imageType).isRequired,
  showOneImage: PropTypes.bool,
};

ResortCardImageCarousel.defaultProps = {
  showOneImage: false,
};

export default ResortCardImageCarousel;
