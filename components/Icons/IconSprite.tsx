import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useQuery } from '@apollo/client';
import { iconSpriteLoading, iconSpriteState } from '../../atoms/iconSpriteState';
import { GET_ICON_SPRITE } from '../../hooks/getIconSprite';

const IconSprite = () => {
  const [, setSprite] = useRecoilState(iconSpriteState);
  const [, setSpriteLoading] = useRecoilState(iconSpriteLoading);
  const { loading, error, data } = useQuery(GET_ICON_SPRITE);

  useEffect(() => {
    if (!data?.iconSprite) return;

    try {
      setSprite(data.iconSprite);

      if (!document.getElementById('icon-sprite')) {
        const div = document.createElement('div');
        div.id = 'icon-sprite';
        div.style.display = 'none';
        div.innerHTML = data.iconSprite;
        document.body.appendChild(div);
      }
    } catch (err) {
      console.error('Failed to load sprite:', err);
    }
  }, [data, setSprite]);

  useEffect(() => {
    return () => {
      document.getElementById('icon-sprite')?.remove();
    };
  }, []);

  if (loading) {
    setSpriteLoading(true);
  } else {
    setSpriteLoading(false);
  }

  if (loading || error) {
    if (error) console.error('Failed to load icons:', error);
    return null;
  }

  return null;
};

export default IconSprite;
