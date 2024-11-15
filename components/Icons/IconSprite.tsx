import { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useQuery } from '@apollo/client';
import { iconSpriteLoading, iconSpriteState } from '../../atoms/iconSpriteState';
import { GET_ICON_SPRITE } from '../../hooks/getIconSprite';

const IconSprite = () => {
  const [, setSprite] = useRecoilState(iconSpriteState);
  const [, setSpriteLoading] = useRecoilState(iconSpriteLoading);
  const { loading, error, data } = useQuery(GET_ICON_SPRITE);

  // Memoize the sprite creation function
  const createSpriteElement = useCallback((spriteData: string) => {
    if (!document.getElementById('icon-sprite')) {
      const div = document.createElement('div');
      div.id = 'icon-sprite';
      div.style.display = 'none';
      div.innerHTML = spriteData;
      document.body.appendChild(div);
    }
  }, []);

  useEffect(() => {
    setSpriteLoading(loading);

    if (error) {
      console.error('Failed to load icons:', error);
      return;
    }

    if (data?.iconSprite) {
      try {
        setSprite(data.iconSprite);
        createSpriteElement(data.iconSprite);
      } catch (err) {
        console.error('Failed to load sprite:', err);
      }
    }

    return () => {
      document.getElementById('icon-sprite')?.remove();
    };
  }, [loading, error, data, setSprite, setSpriteLoading, createSpriteElement]);

  return null;
};

export default IconSprite;
