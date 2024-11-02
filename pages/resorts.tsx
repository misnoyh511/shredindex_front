import React from 'react';
import { CContainer } from '@coreui/react';
import RankedResortList from '../components/RankedResortList/RankedResortList';
import ResortsParallaxBackground from '../components/ResortsParallaxBackground/ResortsParallaxBackground';
import RankedResortFilterMenu from '@/RankedResortFilterMenu/RankedResortFilterMenu';
import { currentFilterState } from '../atoms/filterState';
import { useRecoilState } from 'recoil';
import { FormData } from '../types/filterTypes';

const Resorts: React.FC = () => {
  const [formData] = useRecoilState<FormData>(currentFilterState);
  const activeFilterCount = formData.groupedType?.filter(filter => filter.toggleOn).length || 0;

  return (
    <CContainer>
      <div className="resorts mt-4">
        <div className="ranked-resort-list row">
          <ResortsParallaxBackground/>
          <div className="ranked-resort-list__filters-wrap col-sm-12 w-100">
            <RankedResortFilterMenu
              filterQuantity={activeFilterCount}
            />
          </div>
          <RankedResortList cardLimit={5}/>
        </div>
      </div>
    </CContainer>
  );
};

export default Resorts;
