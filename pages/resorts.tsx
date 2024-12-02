import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import RankedResortList from '../components/RankedResortList/RankedResortList';
import ResortsParallaxBackground from '../components/ResortsParallaxBackground/ResortsParallaxBackground';
import RankedResortFilterMenu from '@/RankedResortFilterMenu/RankedResortFilterMenu';
import RankedResortMap from '../components/RankedResortMap/RankedResortMap';
import { currentFilterState } from '../atoms/filterState';
import { useRecoilState } from 'recoil';
import { FormData } from '../types/filterTypes';
import useWindowDimensions from '../hooks/getWindowDimensions';
import breakpoints from '../src/js/components/config/breakpoints';

const Resorts: React.FC = () => {
  const [formData] = useRecoilState<FormData>(currentFilterState);
  const { width } = useWindowDimensions();
  const isMobileTablet = width <= breakpoints.md;
  const activeFilterCount = formData.groupedType?.filter(filter => filter.toggleOn).length || 0;

  const [sheetPosition, setSheetPosition] = useState('full');
  const [isAtTop, setIsAtTop] = useState(true);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);

  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      setIsAtTop(contentRef.current.scrollTop === 0);
    }
  }, []);

  useEffect(() => {
    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleDragStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    if (sheetRef.current) {
      dragStartHeight.current = sheetRef.current.getBoundingClientRect().height;
    }
  };

  const handleDrag = (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - dragStartY.current;
    const DRAG_THRESHOLD = window.innerHeight * 0.1; // 10% of screen height for major transitions
    const HALF_THRESHOLD = window.innerHeight * 0.05; // 5% for half-state transitions

    // Determine drag direction
    const isDraggingUp = deltaY < 0;

    if (Math.abs(deltaY) > DRAG_THRESHOLD) {
      // Major transitions (full <-> peek)
      if (isDraggingUp && sheetPosition === 'peek') {
        setSheetPosition('half');
      } else if (!isDraggingUp && sheetPosition === 'full') {
        setSheetPosition('half');
      }
    } else if (Math.abs(deltaY) > HALF_THRESHOLD) {
      // More sensitive transitions involving half state
      if (sheetPosition === 'half') {
        setSheetPosition(isDraggingUp ? 'full' : 'peek');
      } else if (sheetPosition === 'peek' && isDraggingUp) {
        setSheetPosition('half');
      } else if (sheetPosition === 'full' && !isDraggingUp) {
        setSheetPosition('half');
      }
    }
  };

  const getSheetHeight = () => {
    switch (sheetPosition) {
      case 'full':
        return '91vh';
      case 'half':
        return '50vh';
      case 'peek':
        return '5rem';
      default:
        return '50vh';
    }
  };

  if (isMobileTablet) {
    return (
      <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <ResortsParallaxBackground/>

        {/* Filter Menu */}
        <div className="ranked-resort-list__filters-wrap z-3 position-relative">
          <RankedResortFilterMenu filterQuantity={activeFilterCount}/>
        </div>

        {/* Map */}
        <div style={{ height: '100%', width: '100%' }}>
          <RankedResortMap filters={formData}/>
        </div>

        {/* Draggable Resort List */}
        <div
          ref={sheetRef}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: getSheetHeight(),
            transition: 'height 300ms ease',
            touchAction: 'none',
            zIndex: 2,
            backgroundColor: 'rgb(29, 46, 57)',
            borderTop: 'solid rgb(40, 60, 73)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '0 16px',
          }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
        >
          {/* Drag handle at top */}
          <div className="mb-2" style={{ width: '100%', height: '20px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '8px', background: '#6c757d', margin: '8px auto', borderRadius: '2px' }}></div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            style={{
              height: 'calc(100% - 40px)',
              overflow: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            onScroll={handleScroll}
          >
            <RankedResortList cardLimit={5} />
          </div>

          {/* Navigation pills */}
          {sheetPosition === 'peek' ? (
            <div
              style={{
                position: 'fixed',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#343a40',
                borderRadius: '24px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 2000,
              }}
              onClick={() => setSheetPosition('full')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>View List</span>
            </div>
          ) : (
            isAtTop === false && (
              <div
                style={{
                  position: 'fixed',
                  bottom: '32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#343a40',
                  borderRadius: '24px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  zIndex: 2000,
                }}
                onClick={() => setSheetPosition('peek')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>View Map</span>
              </div>
            )
          )}

          {/* Expand/collapse handle */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: '#6c757d',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
            onClick={() => setSheetPosition(sheetPosition === 'full' ? 'half' : 'full')}
          />
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
