import React from 'react';
import ButtonSkeleton from '../SkeletonState/ButtonSkeleton';

const RankedResortFilterMenuSkeleton = () => (
  <div className="filter-resorts mb-4 d-flex flex-row">
    <ButtonSkeleton className="me-2" />
    <ButtonSkeleton className="ms-2" />
  </div>
);

export default RankedResortFilterMenuSkeleton;
