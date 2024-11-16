import React from 'react';
import { FormattedMessage } from 'react-intl';
import Statistic from '../../Statistic/Statistic';
import getUnit from '../../../hooks/getUnit';
import { CCard, CCardBody, CListGroup } from '@coreui/react';
import { Numeric } from '../../../types/resortTypes';
import TerrainPercentageStats from '@/TerrainPercentageStats/TerrainPercentageStats';
import { TypeDescription } from '@/TypeDescription/TypeDescription';

interface ResortNumericsProps {
  numerics: Numeric[];
}

const EXCLUDED_NUMERICS = ['terrain_beginner', 'terrain_intermediate', 'terrain_expert'];

const ResortNumerics: React.FC<ResortNumericsProps> = ({ numerics }) => {
  // Filter out terrain difficulty numerics
  const filteredNumerics = numerics?.filter(numeric => !EXCLUDED_NUMERICS.includes(numeric.name));
  const percentageNumerics = numerics?.filter(numeric => EXCLUDED_NUMERICS.includes(numeric.name));

  if (!filteredNumerics || filteredNumerics.length < 1) {
    return (
      <div className="resort-single-card-heading user-select-none">
        <FormattedMessage
          id="shredindex.statistics.NOSTATISTICSAVALIABLE"
          defaultMessage="No statistics available"
        />
      </div>
    );
  }

  return (
    <div className="resort-single numeric-list mb-4">
      <h3 className="resort-single-card-heading user-select-none">
        <FormattedMessage
          id="shredindex.statistics.KEYINSIGHTS"
          defaultMessage="Key insights"
        />
      </h3>
      {filteredNumerics.length > 0 ? (
        <div className="numeric-list__list d-flex w-100">
          <div className="numeric-list__numeric d-flex flex-wrap gap-3">
          {filteredNumerics.map(({
            id, title, name, value, type,
          }) => (
            <div key={id} className="numeric-item">
              <Statistic
                title={title}
                name={name}
                statistic={value}
                maxValue={type.max_value}
                unit={getUnit({ unit: type.unit })}
              />
              <div className="generic-description fw-light small text-muted mb-2">
                <TypeDescription label={name}/>.
              </div>
            </div>
          ))}
          </div>
        </div>
      ) : (
        <CCard className="numerics-card">
          <CCardBody>
          <CListGroup>
              <p className="numerics caption-text">
                No available key insights
              </p>
            </CListGroup>
          </CCardBody>
        </CCard>
      )}
      <TerrainPercentageStats
        numerics={percentageNumerics}
      />
    </div>
  );
};

export default ResortNumerics;
