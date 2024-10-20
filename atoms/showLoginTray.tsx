import { atom } from 'recoil';

export const showLoginTray = atom<'login' | 'signup' | null>({
  key: 'showLoginState',
  default: null,
});
