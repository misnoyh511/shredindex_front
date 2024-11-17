import React from 'react';
import { useSetRecoilState } from 'recoil';
import { CBadge, CButton } from '@coreui/react';
import filtersGoggles from '../../icons/filters-goggles.svg';
// import locationEarth from '../../icons/location-earth.svg';
import sortBy from '../../icons/sort-by.svg';
import { FormattedMessage } from 'react-intl';
import RankedResortFilterTray from '../RankedResortFilterTray/RankedResortFilterTray';
import { showFilterTrayState } from '../../atoms/showFilterTray';
import RankedResortLifeStyleTray from '../RankedResortLifeStyleTray/RankedResortLifeStyleTray';
import { showLifestyleTrayState } from '../../atoms/showLifestyleTray';
import RankedResortLocationTray from '../RankedResortLocationTray/RankedResortLocationTray';
// import { showLocationTrayState } from '../../atoms/showLocationTray';
import { SvgIcon } from '@/Icons/SvgIcon';

interface RankedResortFilterMenuProps {
  filterQuantity: number;
}

const RankedResortFilterMenu: React.FC<RankedResortFilterMenuProps> = ({ filterQuantity }) => {
  const setShowFilterTray = useSetRecoilState(showFilterTrayState);
  const setShowLifestyleTray = useSetRecoilState(showLifestyleTrayState);
  // const setShowLocationTray = useSetRecoilState(showLocationTrayState);

  return (
    <>
      <div className="filter-menu mb-4 d-flex flex-row gap-3">
        {/*<CButton*/}
        {/*  // variant="outline"*/}
        {/*  color="primary"*/}
        {/*  aria-roledescription={(*/}
        {/*    <FormattedMessage*/}
        {/*      id="shredindex.filter.SHOW_LIFESTYLES_TRAY"*/}
        {/*      defaultMessage="Show Location tray"*/}
        {/*    />*/}
        {/*  ).toString()}*/}
        {/*  className="w-100 filter-menu__show-location-tray"*/}
        {/*  onClick={() => setShowLocationTray(true)}*/}
        {/*>*/}
        {/*  <div className="d-flex align-items-center align-content-center justify-content-center gap-1 flex-wrap">*/}
        {/*    <SvgIcon svgContent={locationEarth} size="2.5rem"/>*/}
        {/*    &nbsp;*/}
        {/*    <FormattedMessage*/}
        {/*      id="shredindex.filter.LOCATION"*/}
        {/*      defaultMessage="Location"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</CButton>*/}
        <CButton
          // variant="outline"
          color="warning"
          aria-roledescription={(
            <FormattedMessage
              id="shredindex.filter.SHOW_LIFESTYLES_TRAY"
              defaultMessage="Show lifestyles tray"
            />
          ).toString()}
          className="w-100 filter-menu__show-lifestyles-tray"
          onClick={() => setShowLifestyleTray(true)}
        >
          <div className="d-flex align-items-center align-content-center justify-content-center gap-1 flex-wrap">
            <SvgIcon svgContent={sortBy} size="2.5rem"/>
            &nbsp;
            <FormattedMessage
              id="shredindex.filter.SORTING"
              defaultMessage="Sorting"
            />
          </div>
        </CButton>
        <CButton
          // variant="outline"
          color="primary"
          aria-roledescription={(
            <FormattedMessage
              id="shredindex.filter.SHOW_FILTERS_TRAY"
              defaultMessage="Show filters tray"
            />
          ).toString()}
          className="w-100 filter-menu__show-filters-tray position-relative"
          onClick={() => setShowFilterTray(true)}
        >
          {filterQuantity >= 1 && (
            <CBadge id="filterQuanitity" position="top-end" shape="rounded-pill" color="secondary">
              {filterQuantity}
            </CBadge>
          )}
          <div className="d-flex align-items-center align-content-center justify-content-center gap-1 flex-wrap">
            <SvgIcon svgContent={filtersGoggles} size="2.5rem"/>
            &nbsp;
            <FormattedMessage
              id="shredindex.filter.FILTERS"
              defaultMessage="Filters"
            />
          </div>
        </CButton>
        <RankedResortLocationTray/>
        <RankedResortFilterTray/>
        <RankedResortLifeStyleTray/>
      </div>
    </>
  );
};

export default RankedResortFilterMenu;
