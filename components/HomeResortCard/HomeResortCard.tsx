import React from 'react';
import {
  CCard, CCardBody, CCardFooter, CCardHeader, CLink,
} from '@coreui/react';
import ResortCardHeader from '../ResortCard/ResortCardHeader/ResortCardHeader';
import ResortImageCarousel from '../ResortCard/ResortCardImageCarousel/ResortCardImageCarousel';
import ResortCardFooter from '../ResortCard/ResortCardFooter/ResortCardFooter';
import HomeResortCardBody from './HomeResortCardBody';
import { Resort, Image, Score } from '../../types/resortTypes';

interface HomeResortCardProps {
  resortData: Resort;
}

const HomeResortCard: React.FC<HomeResortCardProps> = ({ resortData }) => {
  if (!resortData) {
    throw new Error('ResortSingle failed to load');
  }

  const {
    id, title, total_score, url_segment, affiliate_url, resort_images,
  } = resortData;

  const transformedImages: Image[] = resort_images.map((img, index) => ({
    id: `${index}`,
    name: '',  // Add a default value if not available
    alt: img.alt,
    sort_order: index,
    image: {
      path: img.url,
      content_type: 'image/jpeg',  // Add a default value if not available
    },
  }));

  // Create a proper totalScore object for ResortCardHeader
  const totalScoreForHeader: Score = {
    id: `${id}-total-score`,
    name: 'Total Score',
    title: 'Total Score',
    value: total_score.value,
  };

  return (
    <div className="resort-card resort-card-mini d-flex justify-content-center">
      <CCard className="full-expanded resort-card__wrap">
        <div>
          <ResortImageCarousel images={transformedImages} showOneImage />
        </div>
        <CCardHeader className="resort-card__header-wrap pb-0">
          <CLink className="resort-card__affiliate-link link-unstyled" rel="noreferrer noopener" target="_blank"
                 href={affiliate_url}>
            <ResortCardHeader title={title} totalScore={totalScoreForHeader} />
          </CLink>
        </CCardHeader>
        <CCardBody className="resort-card__body-wrap pt-0 pb-0">
          <HomeResortCardBody resort={resortData} collapsed={false} />
        </CCardBody>
        <CCardFooter className="resort-card__footer-wrap pointer-event">
          <ResortCardFooter
            urlSegment={url_segment}
            noCollapse={true}
          />
        </CCardFooter>
      </CCard>
    </div>
  );
};

export default HomeResortCard;
