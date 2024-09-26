import { useState, useEffect } from 'react';

const debounce = (func, ms) => {
  let timer;
  return function bounce(...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, ms);
  };
};

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  } else {
    // Return default values or a placeholder during SSR
    return { width: 0, height: 0 };
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const debouncedHandleResize = debounce(() => {
        setWindowDimensions(getWindowDimensions());
      }, 1000);

      window.addEventListener('resize', debouncedHandleResize);
      return () => window.removeEventListener('resize', debouncedHandleResize);
    }
  }, []);

  return windowDimensions;
}
