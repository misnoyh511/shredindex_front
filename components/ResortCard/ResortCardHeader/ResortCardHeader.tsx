import React from 'react';
import { ResortAttribute } from '../../../types/types';
import Rating from '../../Rating/Rating';

interface ResortCardHeaderProps {
  title: string;
  totalScore?: ResortAttribute;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | null;
}

const ResortCardHeader: React.FC<ResortCardHeaderProps> = (
  {
    title,
    totalScore = { value: 'n/a' },
  }) => (
  <header
    className="resort-card__header mb-3"
    role="banner"
  >
    <Rating
      title={title}
      rating={totalScore?.value || 'n/a'}
      ratingType="total-rating"
      headingLevel="h1"
      aria-label={`Rating for ${title}`}
    />
  </header>
);

export default ResortCardHeader;
