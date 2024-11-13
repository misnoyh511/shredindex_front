import React, { memo } from 'react';

interface SvgIconProps {
  svgContent: string | undefined;
  className?: string;
  size?: string;
}
export const SvgIcon = memo(function SvgIcon({
  svgContent,
  className = '',
  size = '2rem',
}: SvgIconProps) {
  const baseClasses = 'inline-block align-middle';  // Removed fill-current as we'll set it explicitly
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  const containerStyle = {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    margin: '-.3rem',
  };

  // If svgContent is a function (React component), render it
  if (typeof svgContent === 'function') {
    const SvgComponent = svgContent;
    return (
      <span style={containerStyle}>
        <SvgComponent
          className={combinedClasses}
          width="100%"
          height="100%"
          viewBox="0 0 1024 1024"
          preserveAspectRatio="xMidYMid meet"
          style={{
            fill: 'currentColor',
            color: 'inherit',
            display: 'block',
          }}
        />
      </span>
    );
  }

  return (
    <span style={containerStyle}>
      <svg
        className={combinedClasses}
        width="100%"
        height="100%"
        viewBox="0 0 1024 1024"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fill: 'currentColor',
          color: 'inherit',
          display: 'block',
        }}
      >
        {typeof svgContent === 'string' && <path d={svgContent} />}
      </svg>
    </span>
  );
});
