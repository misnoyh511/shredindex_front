import React from 'react';
import Flickity from 'react-flickity-component';
import Image from 'next/image';
import ResortImagePlaceholder from '../../../images/resort-image-placeholder.svg';
import flickityOptions from '../../../src/js/components/config/flickity-options';
import { Image as ImageArray } from '../../../types/resortTypes';

interface ResortCardImageCarouselProps {
  showOneImage?: boolean;
  images: ImageArray[];
}


const ResortCardImageCarousel: React.FC<ResortCardImageCarouselProps> = ({ showOneImage = false, images }) => {
  const filteredImages = images.filter((img) => img.image?.path);
  const imagesToShow = showOneImage ? filteredImages.slice(0, 1) : filteredImages;

  const options = {
    ...flickityOptions,
    prevNextButtons: !showOneImage && imagesToShow.length > 1,
    pageDots: !showOneImage && imagesToShow.length > 1,
  };

  const renderImage = (image: ImageArray) => (
    <div key={image.id} className="carousel__image-wrapper w-100 h-100">
      <Image
        className="carousel__image"
        layout="fill"
        src={image.image.path}
        alt={image.alt}
      />
    </div>
  );

  const renderPlaceholder = () => (
    <div key="placeholder" className="carousel__image-wrapper w-100 h-100">
      <ResortImagePlaceholder
        className="carousel__image--no-images"
        alt="shred-index-resort-placeholder"
      />
    </div>
  );

  if (showOneImage || imagesToShow.length === 1) {
    return (
      <div className="resort-card__image-carousel">
        <div className="carousel w-100 h-100 gray-300-bg border-radius-medium position-relative">
          {imagesToShow.length > 0 ? renderImage(imagesToShow[0]) : renderPlaceholder()}
        </div>
      </div>
    );
  }

  return (
    <div className="resort-card__image-carousel">
      <Flickity
        className="carousel w-100 h-100 gray-300-bg border-radius-medium position-relative"
        elementType="div"
        options={options}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        {imagesToShow.length > 0
          ? imagesToShow.map(renderImage)
          : [renderPlaceholder()]}
      </Flickity>
    </div>
  );
};

export default ResortCardImageCarousel;
