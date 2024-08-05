import React from 'react';
import { CButton, CImage } from '@coreui/react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ReactComponent as HeroDesktop } from '../../../images/homepage/advanced-filter-background-desktop.svg';
import { ReactComponent as HeroTablet } from '../../../images/homepage/advanced-filter-background-tablet.svg';
import { ReactComponent as HeroMobile } from '../../../images/homepage/advanced-filter-background-mobile.svg';
import AdvancedFilterSystem from '../../../images/homepage/advanced-filter-filter.svg';

const AdvancedWord = ({ children }) => (
  <span className="text-secondary">{children}</span>
);

AdvancedWord.propTypes = {
  children: PropTypes.node.isRequired,
};
const HomeAdvancedFilters = () => (
  <div className="advanced-filters-hero hero">
    <div className="hero__image">
      <div className="hero__svg hero__svg--desktop">
        <HeroDesktop />
      </div>
      <div className="hero__svg hero__svg--tablet">
        <HeroTablet />
      </div>
      <div className="hero__svg hero__svg--mobile">
        <HeroMobile />
      </div>
    </div>
    <div className="advanced-filters-content hero__heading text-center">
      <h3 className="fw-bolder">
        <FormattedMessage
          id="shredindex.homeAdvancedFilters.ADVANCED_FILTERING"
          defaultMessage="Use our {advanced} filtering system."
          values={{
            advanced: <AdvancedWord>advanced</AdvancedWord>,
          }}
        />
      </h3>
      <CImage fluid className="w-100 p-2 mb-4 mt-4" src={AdvancedFilterSystem} />
      <div className="w-100 text-center">
        <Link
          to="resorts"
        >
          <CButton className="p-2 pe-4 ps-4 text-white" color="secondary" variant="">More filters</CButton>
        </Link>
      </div>
    </div>
  </div>
);

export default HomeAdvancedFilters;
