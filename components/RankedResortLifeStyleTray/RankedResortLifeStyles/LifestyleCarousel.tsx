import React, { useRef, useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import { useRecoilState } from 'recoil';
import { currentOrderByState } from '../../../atoms/filterState';
import { TypeIcon } from '@/Icons/TypeIcon';
import { SvgIcon } from '@/Icons/SvgIcon';
import { useRouter } from 'next/router';
import { useLifestyleOptions } from '../../../types/filterTypes';
import useWindowDimensions from '../../../hooks/getWindowDimensions';
import flickityOptions from '../../../src/js/components/config/flickity-options';
import TotalScore from '../../../icons/total-score.svg';
import breakpoints from '@/js/components/config/breakpoints';

const LOADING_ITEMS = Array(20).fill(null);

const LifestyleFilterBar: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useRecoilState(currentOrderByState);
  const router = useRouter();
  const options = useLifestyleOptions(); // Using our new hook instead of useQueryOrderBy
  const { width } = useWindowDimensions();
  const flickityRef = useRef<Flickity>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isMobile = width < breakpoints.md;

  const flickityOptionsYes = {
    ...flickityOptions,
    prevNextButtons: isMobile ? false : true,
    pageDots: false,
    wrapAround: false,
    dragThreshold: 30,
    selectedAttraction: 0.01,
    freeScroll: true,
    freeScrollFriction: 0.03,
    friction: 0.15,
    groupCells: '98%',
  };

  useEffect(() => {
    if (isFirstLoad && options?.length) {
      setIsFirstLoad(false);
    }
  }, [options, isFirstLoad]);

  useEffect(() => {
    const flickityInstance = flickityRef.current;

    return () => {
      if (flickityInstance) {
        try {
          flickityInstance.destroy();
        } catch (e) {
          console.error('Error cleaning up Flickity:', e);
        }
      }
    };
  }, []);

  const handleSelect = (value: string) => {
    const newFilter = {
      type_name: value,
      direction: 'desc',
    };

    setCurrentFilter(newFilter);

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        orderBy: JSON.stringify(newFilter),
        page: '1',
      },
    }, undefined, { scroll: false });
  };

  const isOptionActive = (optionValue: string) => {
    if (!currentFilter?.type_name && optionValue === 'total_score') {
      return true;
    }
    return currentFilter?.type_name === optionValue;
  };

  const renderItems = () => {
    if (!options?.length) {
      return LOADING_ITEMS.map((_, index) => (
        <div key={`loading-${index}`} className="lifestyle-filter__item-wrapper">
          <div className="lifestyle-filter__item">
            <div className="lifestyle-filter__icon">
              <TypeIcon typeName='loading' className="w-100 h-100" size="2.2rem" />
            </div>
            <span className="skeleton skeleton-text lifestyle-filter__label animate-pulse bg-gray-200 h-4 w-16 rounded"></span>
          </div>
        </div>
      ));
    }

    return options.map((option) => (
      <div key={option.value} className="lifestyle-filter__item-wrapper">
        <button
          onClick={() => handleSelect(option.value)}
          className={`lifestyle-filter__item ${
            isOptionActive(option.value) ? 'lifestyle-filter__item--active' : ''
          }`}
        >
          <div className="lifestyle-filter__icon">
            {option.value === 'total_score' ? (
              <SvgIcon
                svgContent={TotalScore}
                className="w-100 h-100"
                size="2.2rem"
              />
            ) : (
              <TypeIcon
                typeName={option.value}
                className="w-100 h-100"
                size="2.2rem"
              />
            )}
          </div>
          <span className="lifestyle-filter__label">{option.label}</span>
          {isOptionActive(option.value) && (
            <div className="lifestyle-filter__indicator"/>
          )}
        </button>
      </div>
    ));
  };

  return (
    <div className="lifestyle-filter" ref={containerRef}>
      <Flickity
        className="carousel w-100"
        elementType="div"
        options={{
          ...flickityOptionsYes,
          initialIndex: 0,
        }}
        disableImagesLoaded={false}
        static={false}
        flickityRef={(c) => (flickityRef.current = c)}
      >
        {renderItems()}
      </Flickity>
    </div>
  );
};

export default LifestyleFilterBar;
