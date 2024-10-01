import React from 'react';
import Flickity from 'react-flickity-component';
import Image from 'next/image';
import { CModal, CModalBody } from '@coreui/react';
import { Image as ImageType } from '../../../types/types';
import flickityOptions from '../../../src/js/components/config/flickity-options';

interface ResortImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageType[];
  initialIndex: number;
}

const ResortImageModal: React.FC<ResortImageModalProps> = ({ isOpen, onClose, images, initialIndex }) => {
  const modalFlickityOptions = {
    ...flickityOptions,
    initialIndex,
    prevNextButtons: true,
    pageDots: true,
    contain: true,
    imagesLoaded: true,
  };

  return (
    <CModal
      visible={isOpen}
      onClose={onClose}
      size="xl"
      alignment="center"
    >
      <CModalBody>
        <Flickity
          className="resort-image-modal carousel w-100 h-100"
          elementType="div"
          options={modalFlickityOptions}
          disableImagesLoaded
          reloadOnUpdate
          static
        >
          {images.map((image) => (
            <div key={image.id} className="carousel__image-wrapper w-100 h-100">
              <Image
                className="carousel__image"
                layout="fill"
                src={image.image.path}
                alt={image.alt}
              />
            </div>
          ))}
        </Flickity>
      </CModalBody>
    </CModal>
  );
};

export default ResortImageModal;
