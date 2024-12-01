import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CBadge, CButton } from '@coreui/react';
import filtersGoggles from '../../icons/filters-goggles.svg';
import { FormattedMessage } from 'react-intl';
import RankedResortFilterTray from '../RankedResortFilterTray/RankedResortFilterTray';
import { showFilterTrayState } from '../../atoms/showFilterTray';
import RankedResortLifeStyleTray from '../RankedResortLifeStyleTray/RankedResortLifeStyleTray';
import RankedResortLocationTray from '../RankedResortLocationTray/RankedResortLocationTray';
import { SvgIcon } from '@/Icons/SvgIcon';
import LifestyleFilterBar from '@/RankedResortLifeStyleTray/RankedResortLifeStyles/LifestyleCarousel';
import useWindowDimensions from '../../hooks/getWindowDimensions';
import breakpoints from '@/js/components/config/breakpoints';
import { TypeDescription } from '@/TypeDescription/TypeDescription';
import { currentOrderByState } from '../../atoms/filterState';

interface RankedResortFilterMenuProps {
  filterQuantity: number;
}

const RankedResortFilterMenu: React.FC<RankedResortFilterMenuProps> = ({ filterQuantity }) => {
  const setShowFilterTray = useSetRecoilState(showFilterTrayState);
  const [currentFilter] = useRecoilState(currentOrderByState);
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.md;

  return (
    <div className={`filter-menu-wrap ${isMobile ? '' : 'mb-3'}`}>
      <div className="filter-menu d-flex flex-row align-items-center gap-2 pe-2">
        <div className="w-100">
          <LifestyleFilterBar/>
        </div>
        {/*{!isMobile && (*/}
          <CButton
            // variant="outline"
            color="secondary"
            variant="outline"
            size="sm"
            aria-roledescription={(
              <FormattedMessage
                id="shredindex.filter.SHOW_FILTERS_TRAY"
                defaultMessage="Show filters tray"
              />
            ).toString()}
            className="filter-menu__show-filters-tray position-relative text-light"
            onClick={() => setShowFilterTray(true)}
          >
            {filterQuantity >= 1 && (
              <CBadge id="filterQuanitity" position="top-end" shape="rounded-pill" color="secondary">
                {filterQuantity}
              </CBadge>
            )}
            <div className="d-flex align-items-center align-content-center justify-content-center gap-1 flex-wrap small">
              <SvgIcon svgContent={filtersGoggles} size="2.2rem"/>
              &nbsp;
              <FormattedMessage
                id="shredindex.filter.FILTERS"
                defaultMessage="Filters"
              />
            </div>
          </CButton>
        {/*)}*/}
        <RankedResortLocationTray/>
        <RankedResortFilterTray/>
        <RankedResortLifeStyleTray/>
      </div>
      <div className="lifestyle-filter__description mb-3">
        <div className="generic-description fw-light small text-md-center text-center">
          <CBadge color="dark" className={'small fw-light'}>
            <TypeDescription label={currentFilter?.type_name || 'total_score'}/>
          </CBadge>
        </div>
      </div>
    </div>
  );
};

export default RankedResortFilterMenu;
