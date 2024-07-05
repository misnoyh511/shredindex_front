import React from 'react';
import Flickity from 'react-flickity-component';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { imageType } from '../../../types/types';
import flickityOptions from '../../config/flickity-options';

const ResortImageCarousel = ({ images }) => {
  const options = {
    ...flickityOptions,
    prevNextButtons: images.length > 1,
    imagesLoaded: true,
    pageDots: images.length > 1,
  };

  if (images.length < 1) {
    return (
      <div className="h6 user-select-none mb-2">
        <FormattedMessage id="shredindex.resort.RESORT_HAS_NO_IMAGES" defaultMessage="Visuals pending. The resort's beauty remains a delightful secret for now." />
      </div>
    );
  }

  return (
    <div className="resort-single resort-single__image-carousel mb-4">
      <div className="resort-card__small-label user-select-none mb-2">
        <FormattedMessage id="shredindex.resort.IMAGES" defaultMessage="Images" />
      </div>
      <Flickity
        className="carousel w-100 h-100 gray-300-bg border-radius-medium mb-4"
        elementType="div"
        options={options}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        {images.filter((img) => img.image?.path)
          .map(({
            id,
            alt,
            image,
          }) => (
            <img key={id} className="carousel__image" src={image?.path} alt={alt} />
          ))}
      </Flickity>
    </div>
  );
};

ResortImageCarousel.propTypes = {
  images: PropTypes.arrayOf(imageType).isRequired,
};

export default ResortImageCarousel;
