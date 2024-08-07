import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import RheostatTicker from './RheostatTicker/RheostatTicker';
import useQueryResortsRheostat from '../../hooks/useQueryResortsRheostat';

const maxTickers = 100;
const minTickerHeight = 1;
const maxTickerHeight = 100;

const RangeRheostatGraph = ({
  leftPosition,
  rightPosition,
  sliderMin,
  sliderMax,
  typeName,
  upperValue,
  lowerValue,
  graphTickerQuantity,
}) => {
  const { loading, data, error } = useQueryResortsRheostat(typeName);

  const spanPercent = useMemo(() => 100 / graphTickerQuantity, [graphTickerQuantity]);

  const tickers = useMemo(() => {
    if (!data?.rheostatDirective) return [];

    const { tickers: rawTickers } = data.rheostatDirective;
    const aggregationFactor = Math.floor(maxTickers / graphTickerQuantity);

    const aggregatedTickers = Array.from({ length: graphTickerQuantity }, (_, index) => {
      const startIndex = index * aggregationFactor;
      const endIndex = Math.min(startIndex + aggregationFactor, maxTickers);
      return rawTickers.slice(startIndex, endIndex).reduce((sum, count) => sum + count, 0);
    });

    const maxCount = Math.max(...aggregatedTickers);

    return aggregatedTickers.map((count, index) => {
      const height = maxCount > 0 ? (count / maxCount) * maxTickerHeight : minTickerHeight;
      const tickPosition = index * spanPercent;
      const isOutOfRange = (upperValue < sliderMax && tickPosition > rightPosition)
        || (lowerValue > sliderMin && tickPosition < leftPosition);

      return {
        key: index,
        height: Math.max(height, minTickerHeight),
        backgroundColor: isOutOfRange ? 'dark' : 'light',
      };
    });
  }, [
    data,
    graphTickerQuantity,
    leftPosition,
    rightPosition,
    sliderMin,
    sliderMax,
    upperValue,
    lowerValue,
    spanPercent,
  ]);

  if (loading) {
    return (
      <div className="range-rheostat-graph">
        <div className="range-rheostat-graph__ticker-wrap d-flex justify-content-around">
          {Array.from({ length: graphTickerQuantity }, (_, i) => (
            <RheostatTicker
              key={i}
              value={i + 1}
              backgroundColor="dark"
              isLoading
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  const graphKey = `${leftPosition}-${rightPosition}-${upperValue}-${lowerValue}-${typeName}`;

  return (
    <div className="range-rheostat-graph" key={graphKey}>
      <div className="range-rheostat-graph__ticker-wrap d-flex justify-content-around">
        {tickers.map(({ key, height, backgroundColor }) => (
          <RheostatTicker
            key={key}
            value={height}
            backgroundColor={backgroundColor}
          />
        ))}
      </div>
    </div>
  );
};

RangeRheostatGraph.propTypes = {
  leftPosition: PropTypes.number.isRequired,
  rightPosition: PropTypes.number.isRequired,
  sliderMin: PropTypes.number.isRequired,
  sliderMax: PropTypes.number.isRequired,
  typeName: PropTypes.string.isRequired,
  upperValue: PropTypes.number.isRequired,
  lowerValue: PropTypes.number.isRequired,
  graphTickerQuantity: PropTypes.number.isRequired,
};

export default React.memo(RangeRheostatGraph);
