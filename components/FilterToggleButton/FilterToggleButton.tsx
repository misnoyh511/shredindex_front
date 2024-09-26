import React, { useState, ReactNode } from 'react';
import { CBadge, CTooltip } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilX, cilLockLocked } from '@coreui/icons';
import getTypeIcon from '../../hooks/getTypeIcon';
import { FilterToggleButtonProps } from '../../types/filterTypes';

const FilterToggleButton: React.FC<FilterToggleButtonProps> = ({
  id,
  label,
  name,
  tooltip,
  children,
  className,
  updateForm,
  toggle,
  isLocked,
}) => {
  const [toggleOn, setToggleOn] = useState(toggle);

  const handleToggle = async () => {
    if (!toggleOn && !isLocked) {
      setToggleOn(true);
      await updateForm(id, true);
    }
  };

  const handleClose = async () => {
    setToggleOn(false);
    await updateForm(id, false);
  };

  const isReactNode = (value: unknown): value is ReactNode => {
    return React.isValidElement(value) || typeof value === 'string' || typeof value === 'number' || Array.isArray(value);
  };

  return (
    <div id={id} className={`filter-toggle-button ${className || ''}`}>
      <div
        onClick={handleToggle}
        onKeyPress={handleToggle}
        role="button"
        tabIndex={0}
        className={`btn btn-dark filter-toggle-button__frame
      ${!toggleOn ? 'filter-toggle-button__frame--filter-off' : 'filter-toggle-button__frame--filter-on'}`}
      >
        <div className="filter-toggle-button__frame-header d-flex w-100">
          <div className="filter-toggle-button__frame-header-left-align d-flex align-items-center gap-2 w-100">
            <CIcon size="lg" className="statistic__icon" icon={getTypeIcon(name)} />
            {' '}
            <div className="filter-toggle-button__frame-header-title">
              {isLocked && (
                <CBadge id="filterQuanitity" position="top-end" shape="rounded-pill" color="secondary">
                  <CIcon icon={cilLockLocked} size="sm" />
                </CBadge>
              )}
              {label}
            </div>
            {toggleOn && (
              <CTooltip content={tooltip}>
                <div className="info-tooltip ms-1 border-radius-large">
                  <span className="info-icon small">?</span>
                </div>
              </CTooltip>
            )}
          </div>
          {toggleOn && (
            <div className="filter-toggle-button__frame-header-right-align d-inline-flex justify-content-end gap-2">
              <div
                aria-label="filter-toggle-button"
                onClick={handleClose}
                onKeyPress={handleClose}
                role="button"
                tabIndex={0}
                className="filter-toggle-button__frame-header-close ps-2 pe-1 fw-bold"
              >
                <CIcon icon={cilX} size="lg" />
              </div>
            </div>
          )}
        </div>
        {toggleOn && children && (
          <div className="filter-toggle-button__frame-body p-4 bg-dark">
            {typeof children === 'function' ? children(id, toggleOn) : isReactNode(children) ? children : null}
          </div>
        )}
      </div>
      {!toggleOn && (
        <CTooltip content={tooltip}>
          <div className="info-tooltip ms-2 border-radius-large">
            <span className="info-icon fw-bold small">?</span>
          </div>
        </CTooltip>
      )}
    </div>
  );
};

export default FilterToggleButton;
