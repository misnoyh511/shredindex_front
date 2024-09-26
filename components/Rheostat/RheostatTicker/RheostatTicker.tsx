import React, { useState, useEffect } from 'react';

interface RheostatTickerProps {
  value: number;
  backgroundColor: string;
  isLoading?: boolean;
}

const RheostatTicker: React.FC<RheostatTickerProps> = ({ value, backgroundColor, isLoading = false }) => {
  const [count, setCount] = useState(value);
  const [increase, setIncrease] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCount((prevCount) => (increase ? prevCount + 1 : prevCount - 1));
        if (count === 100) {
          setIncrease(false);
        } else if (count === 0) {
          setIncrease(true);
        }
      }, 150); // Set the interval time as per your need
      return () => clearInterval(interval);
    }
    return undefined;
  }, [count, increase, isLoading]);

  return (
    <div
      className={`range-rheostat-graph__ticker range-rheostat-graph__ticker--${backgroundColor} transition`}
      style={{ height: `${isLoading ? Math.floor(Math.random() * 70) + 1 : value}%` }}
    />
  );
};

export default RheostatTicker;
