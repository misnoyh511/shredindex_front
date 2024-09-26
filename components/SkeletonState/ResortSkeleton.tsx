import { CCard } from '@coreui/react';
import React from 'react';

const ResortSkeleton = () => (
  <div className="container resort-container skeleton fade">
    <CCard className="skeleton-card p-5" />
    <CCard className="skeleton-card p-5" />
    <CCard className="skeleton-card p-5" />
    <CCard className="skeleton-card p-5" />
  </div>
);

export default ResortSkeleton;
