import React from 'react';

const SupportersLoadingState = () => {
  const loadingItems = Array(5).fill(null);

  return (
    <>
        {loadingItems.map((_, index) => (
          <div className="support-banner__supporter m-auto p-3" key={index}>
            <div className="support-banner__supporter-link">
              <div
                className="support-banner__supporter-image opacity-3 skeleton-loader"
                style={{
                  width: '120px',
                  height: '30px',
                  backgroundColor: '#1d2e39',
                  borderRadius: '1rem',
                }}
              />
            </div>
          </div>
        ))}
      </>
  );
};

export default SupportersLoadingState;
