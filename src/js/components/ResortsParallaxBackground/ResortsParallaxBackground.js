import React, { useEffect } from 'react';
import { ReactComponent as RankedResortsBackground } from '../../../images/ranked-resorts-background.svg';

const ResortsParallaxBackground = () => {
  useEffect(() => {
    const onScroll = (e) => {
      const scrollPos = e.target.documentElement.scrollTop;
      e.target.documentElement.style.setProperty('--scrollPos', `${scrollPos}px`);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <div className="resorts-parallax-background w-100">
      <div className="resorts-parallax-background__image">
        <RankedResortsBackground />
      </div>
    </div>
  );
};

export default ResortsParallaxBackground;
