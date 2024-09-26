import { atom } from 'recoil';

export const showSidebar = atom<boolean>({
  key: 'showSidebar',
  default: false,
});
