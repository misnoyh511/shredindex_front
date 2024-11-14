import React, { memo } from 'react';
import { useRecoilState } from 'recoil';
import { iconSpriteLoading } from '../../atoms/iconSpriteState';
import IconLoadingAnimation from '../../icons/icon-loading-animation.svg';

interface TypeIconProps {
  typeName: string | undefined;
  className?: string;
  size?: string;
}

export const TypeIcon = memo(function TypeIcon({
  typeName,
  className = '',
  size = '2rem',
}: TypeIconProps) {
  const [spriteLoading] = useRecoilState(iconSpriteLoading);
  const baseClasses = 'inline-block align-middle fill-current icon-negative-margin';
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  if (spriteLoading) {
    return (
      <span className="position-relative d-block" style={{ width: size, height: size }}>
        <IconLoadingAnimation />
      </span>
    );
  }

  return (
    <span className="position-relative d-block" style={{ width: size, height: size }}>
      <svg
        className={combinedClasses}
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <use href={`#icon-${typeName}`}/>
      </svg>
    </span>
  );
});
