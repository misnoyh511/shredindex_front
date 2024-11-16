import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TypeIcon } from '@/Icons/TypeIcon';
import { CCard, CCardBody } from '@coreui/react';
import { Numeric } from '../../types/resortTypes';

interface TerrainStatisticsProps {
  numerics: Numeric[];
}

interface TerrainStatProps {
  title: string;
  name: string;
  value: number;
  type: {
    max_value: number;
    unit: string;
  };
}

const TERRAIN_TYPES = ['terrain_beginner', 'terrain_intermediate', 'terrain_expert'];

const TERRAIN_CONFIG = {
  terrain_beginner: {
    color: '#5bd4a8',
    label: 'Beginner',
    gradient: 'linear-gradient(90deg, #5bd4a8 0%, #4eb5a6 100%)',
  },
  terrain_intermediate: {
    color: '#63c2f8',
    label: 'Intermediate',
    gradient: 'linear-gradient(90deg, #63c2f8 0%, #338bbe 100%)',
  },
  terrain_expert: {
    color: '#bdd3df',
    label: 'Expert',
    gradient: 'linear-gradient(90deg, #bdd3df 0%, #3E8798 100%)',
  },
};

const TerrainStat: React.FC<TerrainStatProps> = ({
  name,
  value,
  type,
}) => {
  const config = TERRAIN_CONFIG[name as keyof typeof TERRAIN_CONFIG];
  const barWidth = `${(Number(value) / type.max_value) * 100}%`;
  const [statisticInt, statisticDecimal] = value.toString().split('.');


  return (
    <div className="terrain-stat">
      <div className="d-flex align-items-center gap-3"
           style={{
             color: config.color,
           }}
      >
        <TypeIcon
          className="terrain-stat__icon"
          typeName={name}
          size={'2rem'}
        />

        <div className="terrain-stat__content flex-grow-1">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="terrain-stat__title text-white">
              {config.label}
            </span>
            <div className="d-flex align-items-end">
            <span
              className="statistic__number-big display-5 text-left user-select-none"
              color="secondary"
            >
              {statisticInt}
            </span>
                <span className="statistic__number-small strong user-select-none">
                {`.${statisticDecimal || '0'}`}
              </span>
              <span className="statistic__small-label user-select-none">{'%'}</span>
            </div>
          </div>

          <div className="terrain-stat__bar-container">
            <div
              className="terrain-stat__bar"
              style={{
                width: barWidth,
                background: config.gradient,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TerrainStatistics: React.FC<TerrainStatisticsProps> = ({ numerics }) => {
  const terrainNumerics = numerics?.filter(numeric => TERRAIN_TYPES.includes(numeric.name)) || [];

  if (terrainNumerics.length < 1) {
    return null;
  }

  return (
    <div className="resort-single terrain-stats mb-4 mt-4">
      <h3 className="resort-single-card-heading user-select-none d-flex justify-content-between align-items-center">
        <FormattedMessage
          id="shredindex.statistics.TERRAINDIFFICULTY"
          defaultMessage="Terrain Difficulty"
        />
      </h3>

      <CCard>
        <CCardBody className="p-4">
          <div className="d-flex flex-column gap-3">
            {terrainNumerics.map(({
              id, title, name, value, type,
            }) => (
              <TerrainStat
                key={id}
                title={title}
                name={name}
                value={value}
                type={type}
              />
            ))}
          </div>

          {/* Quick visual overview */}
          <div className="terrain-overview mt-4">
            <div className="terrain-overview__bar">
              {terrainNumerics.map(({ id, name, value, type }) => (
                <div
                  key={id}
                  className="terrain-overview__segment"
                  style={{
                    width: `${(value / type.max_value) * 100}%`,
                    background: TERRAIN_CONFIG[name as keyof typeof TERRAIN_CONFIG].gradient,
                  }}
                />
              ))}
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default TerrainStatistics;
