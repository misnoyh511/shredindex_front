import React from 'react';

const SupportersLoadingState = () => (
  <>
    {[1, 2, 3, 4, 5].map((number) => (
      <div key={number} className="support-banner__supporter m-auto p-3">
        <div className="support-banner__supporter-link">
          <div className="support-banner__supporter-image skeleton skeleton-text" />
        </div>
      </div>
    ))}
  </>
);

export default SupportersLoadingState;
