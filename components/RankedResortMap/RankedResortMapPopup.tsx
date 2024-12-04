import React, { useRef, useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import RankedResortMapPopupImageCarousel from '@/RankedResortMap/RankedResortMapPopupImageCarousel';

const ResortPopup = ({ resort, onClose, containerRef }) => {
  const cardRef = useRef(null);
  const mouseDownPosRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(0);
  const [position, setPosition] = useState({ isTop: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!cardRef.current || !containerRef?.current || isMobile) return;

    const updatePosition = () => {
      const container = containerRef.current.getBoundingClientRect();
      const card = cardRef.current.getBoundingClientRect();
      const markerY = container.height / 2;

      let isTop = false;
      if (markerY + card.height + 20 > container.height) {
        isTop = true;
      }

      setPosition({ isTop });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [containerRef, isMobile]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      mouseDownPosRef.current = { x: event.clientX, y: event.clientY };
      startTimeRef.current = Date.now();
    };

    const handleMouseUp = (event) => {
      const distanceX = Math.abs(event.clientX - mouseDownPosRef.current.x);
      const distanceY = Math.abs(event.clientY - mouseDownPosRef.current.y);
      const timeElapsed = Date.now() - startTimeRef.current;
      const isClick = distanceX < 10 && distanceY < 10 && timeElapsed < 200;

      if (isClick && cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (!isMobile) {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onClose, isMobile]);

  const handlePopupClick = (event) => {
    event.stopPropagation();
  };

  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '14rem',
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 16px 16px',
        }}
        onClick={handlePopupClick}
      >
        <CCard ref={cardRef} className="shadow border-0">
          <div className="d-flex p-3">
            <div className="flex-shrink-0" style={{ width: '100px', height: '75px' }}>
              <RankedResortMapPopupImageCarousel
                key={resort.id}
                images={resort?.resort_images}
              />
            </div>

            <CCardBody className="p-0 ps-3 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-start">
                  <h6 className="mb-1 fw-bold">{resort.title}</h6>
                  <CButton
                    onClick={onClose}
                    className="rounded-circle p-1 ms-2"
                    size="sm"
                  >
                    <CIcon icon={cilX} size="sm" />
                  </CButton>
                </div>
                <p className="text-medium-emphasis small mb-1">
                  {[
                    resort.location?.city,
                    resort.location?.state?.name,
                    resort.location?.country?.name,
                  ].filter(Boolean).join(', ')}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                {resort.total_score?.value && (
                  <div className="d-flex align-items-baseline gap-1">
                    <span className="fw-bold">{resort.total_score.value}</span>
                    <span className="text-medium-emphasis small">rating</span>
                  </div>
                )}
                <CButton
                  onClick={() => window.location.href = `/resort/${resort.url_segment}`}
                  color="info"
                  size="sm"
                >
                  View Details
                </CButton>
              </div>
            </CCardBody>
          </div>
        </CCard>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        [position.isTop ? 'top' : 'bottom']: '100%',
        transform: 'translateX(-50%)',
        margin: position.isTop ? '20px 0 0 0' : '0 0 20px 0',
        width: '320px',
        zIndex: 1000,
      }}
      onClick={handlePopupClick}
    >
      <CCard ref={cardRef} className="shadow border-0">
        <div className="position-relative">
          <RankedResortMapPopupImageCarousel
            key={resort.id}
            images={resort?.resort_images}
          />

          <div className="position-absolute top-0 end-0 d-flex gap-2 p-2">
            <CButton
              onClick={onClose}
              className="rounded-circle p-1"
              size="sm"
            >
              <CIcon icon={cilX} size="sm" />
            </CButton>
          </div>
        </div>

        <CCardBody className="p-3">
          <h5 className="mb-1 fw-bold">{resort.title}</h5>
          <p className="text-medium-emphasis small mb-2">
            {[
              resort.location?.city,
              resort.location?.state?.name,
              resort.location?.country?.name,
            ].filter(Boolean).join(', ')}
          </p>

          {resort.total_score?.value && (
            <div className="mt-3 d-flex align-items-baseline gap-1">
              <span className="fw-bold">{resort.total_score.value}</span>
              <span className="text-medium-emphasis small">rating</span>
            </div>
          )}
        </CCardBody>

        <CCardFooter className="border-0 p-3 pt-0">
          <CButton
            onClick={() => window.location.href = `/resort/${resort.url_segment}`}
            color="info"
            className="w-100"
          >
            View Details
          </CButton>
        </CCardFooter>
      </CCard>
    </div>
  );
};

export default ResortPopup;
