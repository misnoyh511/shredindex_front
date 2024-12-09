import React, { useRef, useEffect, useState } from 'react';
import { CSpinner } from '@coreui/react';
import { useResortPopup } from '../../../hooks/useResortPopup';
import { ResortPopupProps } from '../../../types/resortTypes';
import RankedResortMapMobilePopup from './RankedResortMapMobilePopup';
import RankedResortMapDesktopPopup from './RankedResortMapDesktopPopup';
import RankedResortMapMobileLoadingPopup
  from '@/RankedResortMap/RankedResortMapPopup/RankedResortMapMobileLoadingPopup';

const ResortPopup: React.FC<ResortPopupProps> = ({ url_segment, onClose, containerRef }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseDownPosRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(0);
  const [position, setPosition] = useState({ isTop: false });
  const [isMobile, setIsMobile] = useState(false);

  // Fetch resort data using custom hook
  const { loading, error, resort } = useResortPopup(url_segment);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Position calculation for desktop
  useEffect(() => {
    if (!cardRef.current || !containerRef?.current || isMobile) return;

    const updatePosition = () => {
      const container = containerRef.current!.getBoundingClientRect();
      const card = cardRef.current!.getBoundingClientRect();
      const markerY = container.height / 2;

      setPosition({ isTop: markerY + card.height + 20 > container.height });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [containerRef, isMobile]);

  // Click outside handling for desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseDown = (event: MouseEvent) => {
      mouseDownPosRef.current = { x: event.clientX, y: event.clientY };
      startTimeRef.current = Date.now();
    };

    const handleMouseUp = (event: MouseEvent) => {
      const distanceX = Math.abs(event.clientX - mouseDownPosRef.current.x);
      const distanceY = Math.abs(event.clientY - mouseDownPosRef.current.y);
      const timeElapsed = Date.now() - startTimeRef.current;
      const isClick = distanceX < 10 && distanceY < 10 && timeElapsed < 200;

      if (isClick && cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onClose, isMobile]);

  // Loading state
  if (isMobile && loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <RankedResortMapMobileLoadingPopup cardRef={cardRef} onClose={onClose} />
      </div>
    );
  }

  if (!isMobile && loading) {
    return (
      <div className="d-flex justify-content-center p-4 h-100">
        <CSpinner />
      </div>
    );
  }

  // Error state
  if (error || !resort) {
    return (
      <div className="text-danger p-4">
        Error loading resort details
      </div>
    );
  }

  // Render appropriate popup based on device type
  return isMobile ? (
    <RankedResortMapMobilePopup
      resort={resort}
      onClose={onClose}
      cardRef={cardRef}
    />
  ) : (
    <RankedResortMapDesktopPopup
      resort={resort}
      onClose={onClose}
      cardRef={cardRef}
      isTop={position.isTop}
    />
  );
};

export default ResortPopup;
