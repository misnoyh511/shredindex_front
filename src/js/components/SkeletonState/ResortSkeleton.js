import { CCard, CFade } from '@coreui/react';
import React from 'react';

const ResortSkeleton = () => (
  <CFade className="container resort-container skeleton">
    <CCard className="skeleton-card p-5" />
    <CCard className="skeleton-card p-5" />
    <CCard className="skeleton-card p-5" />
    <CCard className="skeleton-card p-5" />
  </CFade>
);

export default ResortSkeleton;
