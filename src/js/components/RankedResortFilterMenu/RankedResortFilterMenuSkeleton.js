import React from 'react';
import ButtonSkeleton from '../SkeletonState/ButtonSkeleton';

const RankedResortFilterMenuSkeleton = () => (
  <div className="filter-menu mb-4 d-flex flex-row gap-4">
    <ButtonSkeleton className="me-2" />
    <ButtonSkeleton className="ms-2" />
  </div>
);

export default RankedResortFilterMenuSkeleton;
