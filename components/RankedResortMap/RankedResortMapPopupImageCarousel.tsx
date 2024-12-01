import React, { useEffect, useRef } from 'react';
import Flickity from 'react-flickity-component';
import Image from 'next/image';
import ResortImagePlaceholder from '../../images/resort-image-placeholder.svg';
import flickityOptions from '../../src/js/components/config/flickity-options';
import { Image as ImageArray } from '../../types/resortTypes';

interface ResortCardImageCarouselProps {
  showOneImage?: boolean;
  images: ImageArray[];
}

const RankedResortMapPopupImageCarousel: React.FC<ResortCardImageCarouselProps> = ({
  images,
}) => {
  const flickityRef = useRef(null);
  const filteredImages = images.filter((img) => img.image?.path);

  const options = {
    ...flickityOptions,
    prevNextButtons: filteredImages.length > 1,
    pageDots: filteredImages.length > 1,
  };

  // Cleanup Flickity instance on unmount
  useEffect(() => {
    return () => {
      if (flickityRef.current?.flkty) {
        flickityRef.current.flkty.destroy();
      }
    };
  }, []);

  const renderImage = (image: ImageArray) => (
    <div key={image.id} className="carousel__image-wrapper w-100 h-100">
      <Image
        className="carousel__image"
        fill={true}
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

  return (
    <div className="map-pop-up-image">
      <Flickity
        ref={flickityRef}
        className="carousel w-100 h-100 gray-300-bg border-radius-medium position-relative"
        elementType="div"
        options={options}
        disableImagesLoaded={false}
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

export default RankedResortMapPopupImageCarousel;
