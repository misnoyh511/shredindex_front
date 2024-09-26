import React from 'react';
import { CFormInput } from '@coreui/react';

const ResortSearchAutosuggestSkeleton = () => (
  <div className="resort-search">
    <div className="resort-search__input-wrapper skeleton">
      <CFormInput
        type="text"
        className="resort-search__input resort-search__input--skeleton"
        disabled
      />
    </div>
  </div>
);

export default ResortSearchAutosuggestSkeleton;
