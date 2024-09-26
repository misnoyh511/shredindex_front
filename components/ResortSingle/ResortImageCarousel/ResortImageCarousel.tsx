import React from 'react';
import Flickity from 'react-flickity-component';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import { Image as ImageType } from '../../../types/types';
import flickityOptions from '../../../src/js/components/config/flickity-options';
import ResortImagePlaceholder from '../../../images/resort-image-placeholder.svg';

interface ResortImageCarouselProps {
  images: ImageType[];
}

const ResortImageCarousel: React.FC<ResortImageCarouselProps> = ({ images = [] }) => {
  const options = {
    ...flickityOptions,
    isDraggable: true,
    prevNextButtons: false,
    contain: true,
    pageDots: false,
    imagesLoaded: true,
    cellAlign: 'left',
  };

  const filteredImages = images.filter((img): img is NonNullable<typeof img> =>
    img !== null && img !== undefined && img.image?.path !== undefined,
  );

  const renderImage = (image: ImageType) => (
    <div key={image.id} className="resort-single__carousel-image-item-wrap gray-300-bg border-radius-medium">
      <Image
        className="carousel__image-item border-radius-medium position-relative"
        src={image.image.path}
        alt={image.name || ''}
        layout='fill'
        objectFit='cover'
      />
    </div>
  );

  const renderPlaceholder = () => (
    <div
      key="placeholder"
      className="resort-single__carousel-image-item-wrap gray-300-bg border-radius-medium"
    >
      <ResortImagePlaceholder
        className="carousel__image--no-images"
        alt="shred-index-resort-placeholder"
      />
    </div>
  );

  return (
    <div className="resort-single resort-single__image-carousel mb-4">
      <div className="resort-single-card-heading user-select-none mb-2">
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
        {filteredImages.length > 0
          ? filteredImages.map(renderImage)
          : [renderPlaceholder()]}
      </Flickity>
    </div>
  );
};

export default ResortImageCarousel;
