import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilArrowRight, cilChevronBottom } from '@coreui/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ResortCardFooter = ({ url, collapsed }) => (
  <div className="resort-card__footer d-flex justify-content-between">
    <div className="resort-card__expand">
      <CIcon icon={cilChevronBottom} />
    </div>
    <Link className="resort-card__resort-link" to={url}>
      <div className="resort-card__go-to-resort-button">
        <span className="resort-card__go-to-resort-text me-2 user-select-none">
          {collapsed ? null : (
            <FormattedMessage id="shredindex.resortcard.GO_TO_RESORT" defaultMessage="Go to Resort" />
          )}
        </span>
        <CIcon icon={cilArrowRight} />
      </div>
    </Link>
  </div>
);

ResortCardFooter.propTypes = {
  url: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default ResortCardFooter;
