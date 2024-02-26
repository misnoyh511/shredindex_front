import React from 'react';

const FilterToggleButtonSkeleton = () => (
  <div className="filter-toggle-button filter-toggle-button__skeleton">
    <div
      role="button"
      className="btn btn-dark filter-toggle-button__frame filter-toggle-button__skeleton filter-toggle-button__frame--filter-off"
    >
      <div className="filter-toggle-button__frame-header d-inline-flex w-100">
        <div className="filter-toggle-button__frame-header-left-align d-inline-flex gap-2 w-100">
          <div className="filter-toggle-button__frame-header-title fw-bold">
            {' '}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FilterToggleButtonSkeleton;
