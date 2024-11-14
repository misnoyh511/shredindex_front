import { atom } from 'recoil';
export const iconSpriteState = atom<string>({
  key: 'iconSpriteState',
  default: '',
});

export const iconSpriteLoading = atom<boolean>({
  key: 'iconSpriteLoading',
  default: true,
});
