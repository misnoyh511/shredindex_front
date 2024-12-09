import React, { useState, useRef, useEffect } from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import RankedResortList from '../components/RankedResortList/RankedResortList';
import ResortsParallaxBackground from '../components/ResortsParallaxBackground/ResortsParallaxBackground';
import RankedResortFilterMenu from '@/RankedResortFilterMenu/RankedResortFilterMenu';
import RankedResortMap from '../components/RankedResortMap/RankedResortMap';
import { currentFilterState, currentOrderByState } from '../atoms/filterState';
import { useRecoilState } from 'recoil';
import { FormData } from '../types/filterTypes';
import useWindowDimensions from '../hooks/getWindowDimensions';
import breakpoints from '../src/js/components/config/breakpoints';

const Resorts: React.FC = () => {
  const [formData] = useRecoilState<FormData>(currentFilterState);
  const [orderBy] = useRecoilState(currentOrderByState);
  const { width } = useWindowDimensions();
  const isMobileTablet = width <= breakpoints.md;
  const isTablet = width > breakpoints.sm && width <= breakpoints.md;
  const activeFilterCount = formData.groupedType?.filter(filter => filter.toggleOn).length || 0;

  const [sheetPosition, setSheetPosition] = useState(() => {
    if (isTablet) return 'half';
    return 'full';
  });
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);

  useEffect(() => {
    if (isTablet) {
      setSheetPosition('half');
    }
  }, [isTablet]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [formData, orderBy]);

  const handleDragStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    if (sheetRef.current) {
      dragStartHeight.current = sheetRef.current.getBoundingClientRect().height;
    }
  };

  const handleDrag = (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - dragStartY.current;
    const isDraggingUp = deltaY < 0;

    if (isTablet) return;
    if (!isDraggingUp) return;

    const DRAG_THRESHOLD = window.innerHeight * 0.1;

    if (Math.abs(deltaY) > DRAG_THRESHOLD) {
      if (sheetPosition === 'peek') {
        setSheetPosition('full');
      }
    }
  };

  const handleViewMap = () => {
    setSheetPosition('peek');
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const getSheetHeight = () => {
    if (isTablet) return '50vh';
    switch (sheetPosition) {
      case 'full':
        return 'calc(100vh - 5rem)';
      case 'peek':
        return '5rem';
      default:
        return 'calc(100vh - 5rem)';
    }
  };

  if (isMobileTablet) {
    return (
      <div className="resorts-mobile">
        <ResortsParallaxBackground/>

        <div className="ranked-resort-list__filters-wrap">
          <RankedResortFilterMenu filterQuantity={activeFilterCount}/>
        </div>

        <div className="resorts-mobile__map">
          <RankedResortMap filters={formData}/>
        </div>

        <div
          ref={sheetRef}
          className={`resorts-mobile__sheet ${sheetPosition}`}
          style={{ height: getSheetHeight() }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
        >
          <div className="resorts-mobile__drag-handle">
            <div className="drag-indicator"></div>
          </div>

          <div className="ranked-resort-list-card-holder" ref={contentRef}>
            <RankedResortList cardLimit={5} />
          </div>

          {!isTablet && (
            <>
              {sheetPosition === 'peek' ? (
                <div
                  className="navigation-pill view-list"
                  onClick={() => setSheetPosition('full')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M3 12h18M3 18h18"/>
                  </svg>
                  <span>View List</span>
                </div>
              ) : (
                <div
                  className="navigation-pill view-map"
                  onClick={handleViewMap}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>View Map</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <CContainer fluid>
      <div className="resorts mt-1">
        <CRow>
          <CCol xs={12}>
            <ResortsParallaxBackground />
            <div className="ranked-resort-list__filters-wrap p-0 w-100">
              <RankedResortFilterMenu filterQuantity={activeFilterCount} />
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12} lg={5}>
            <RankedResortList cardLimit={5} />
          </CCol>
          <CCol xs={12} lg={7}>
            <RankedResortMap filters={formData} />
          </CCol>
        </CRow>
      </div>
    </CContainer>
  );
};

export default Resorts;
