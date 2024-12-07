import React from 'react';
import { FormattedMessage } from 'react-intl';
import Statistic from '@/Statistic/Statistic';
import Rating from '@/Rating/Rating';
import getUnit from '../../hooks/getUnit';

interface KeyInsightType {
  max_value: number;
  unit: string;
}

interface ResortCardKeyInsightType {
  source: 'numeric' | string;
  title: string;
  name: string;
  value: number;
  type?: KeyInsightType;
}

interface ResortCardKeyInsightProps {
  keyInsight: ResortCardKeyInsightType | null;
}

const ResortCardKeyInsight: React.FC<ResortCardKeyInsightProps> = ({ keyInsight }) => {
  if (!keyInsight) return null;

  return (
    <div className="resort-card__content-wrap mb-4">
      <div className="resort-card__small-label user-select-none mb-1">
        <FormattedMessage
          id="shredindex.statistics.KEYINSIGHT"
          defaultMessage="Key insight"
        />
      </div>
      {keyInsight?.source === 'numeric' ? (
        <div className="resort-card__content-1 mb-2 d-flex">
          <div className="w-100">
            <Statistic
              title={keyInsight.title}
              name={keyInsight.name}
              statistic={keyInsight.value}
              maxValue={keyInsight.type?.max_value}
              unit={getUnit({ unit: keyInsight.type?.unit })}
            />
          </div>
        </div>
      ) : (
        <div className="resort-card__content-1 mb-2 d-flex">
          <div className="w-100">
            <Rating
              title={keyInsight.title}
              name={keyInsight.name}
              rating={keyInsight.value}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResortCardKeyInsight;
