import React from 'react';
import { CFormInput } from '@coreui/react';

const ResortSearchAutosuggestSkeleton = () => (
  <div className="resort-search">
    <CFormInput
      type="text"
      className="resort-search__input"
    />
  </div>
);

export default ResortSearchAutosuggestSkeleton;
