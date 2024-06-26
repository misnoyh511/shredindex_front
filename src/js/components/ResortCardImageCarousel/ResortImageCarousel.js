import React from 'react';
import Flickity from 'react-flickity-component';
import PropTypes from 'prop-types';
import resortImagePlaceholder from '../../../images/resort-image-placeholder.svg';
import { imageType } from '../../types/types';
import flickityOptions from '../config/flickity-options';

const ResortImageCarousel = ({ images }) => {
  const options = {
    ...flickityOptions,
    prevNextButtons: images.length > 1,
    pageDots: images.length > 1,
  };

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
        {images.length > 0 ? images.filter((img) => img.image?.path).map(({ id, alt, image }) => (
          <img key={id} className="carousel__image" src={image?.path} alt={alt} />
        ))
          : (
            [<img key="1" className="carousel__image--no-images" src={resortImagePlaceholder} alt="shred-index-resort-placeholder" />]
          )}
      </Flickity>
    </div>
  );
};

ResortImageCarousel.propTypes = {
  images: PropTypes.arrayOf(imageType).isRequired,
};

export default ResortImageCarousel;
