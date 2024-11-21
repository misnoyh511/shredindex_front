import React, { useRef } from 'react';
import Flickity from 'react-flickity-component';
import { useRecoilState } from 'recoil';
import { currentOrderByState } from '../../../atoms/filterState';
import { TypeIcon } from '@/Icons/TypeIcon';
import { SvgIcon } from '@/Icons/SvgIcon';
import { useRouter } from 'next/router';
import useQueryOrderBy from '../../../hooks/useQueryOrderBy';
import useWindowDimensions from '../../../hooks/getWindowDimensions';
import flickityOptions from '../../../src/js/components/config/flickity-options';
import TotalScore from '../../../icons/total-score.svg';
import breakpoints from '@/js/components/config/breakpoints';

interface LifestyleFilterBarProps {
  isMini?: boolean;
}

const LifestyleFilterBar: React.FC<LifestyleFilterBarProps> = () => {
  const [currentFilter, setCurrentFilter] = useRecoilState(currentOrderByState);
  const router = useRouter();
  const { mappedOptions } = useQueryOrderBy();
  const { width } = useWindowDimensions();
  const flickityRef = useRef<Flickity | null>(null);
  const isMobile = width < breakpoints.md;

  const options = {
    ...flickityOptions,
    prevNextButtons: isMobile ? false : true,
    pageDots: false,
    contain: true,
    wrapAround: false,
    freeScroll: true,
    dragThreshold: 10,
  };

  const handleSelect = (value: string) => {
    const newFilter = {
      type_name: value,
      direction: 'desc', // Always set to "Top first"
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

  if (!mappedOptions?.length) {
    return null;
  }

  return (
    <div className="lifestyle-filter">
      <Flickity
        className="carousel w-100"
        elementType="div"
        options={options}
        disableImagesLoaded
        static
        flickityRef={(c) => (flickityRef.current = c)}
      >
        {mappedOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`lifestyle-filter__item ${
              currentFilter?.type_name === option.value
                ? 'lifestyle-filter__item--active'
                : ''
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
            {currentFilter?.type_name === option.value && (
              <div className="lifestyle-filter__indicator"/>
            )}
          </button>
        ))}
      </Flickity>
    </div>
  );
};

export default LifestyleFilterBar;
