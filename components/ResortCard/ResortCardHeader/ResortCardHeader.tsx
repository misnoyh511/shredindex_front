import React from 'react';
import { ResortAttribute } from '../../../types/types';
import Rating from '../../Rating/Rating';

interface ResortCardHeaderProps {
  title: string;
  totalScore?: ResortAttribute;
}

const ResortCardHeader: React.FC<ResortCardHeaderProps> = (
  {
    title,
    totalScore = { value: 'n/a' },
  }) => (
  <div className="resort-card__header mb-3">
    <Rating title={title} rating={totalScore?.value || 'n/a'} ratingType="total-rating" />
  </div>
);

export default ResortCardHeader;
