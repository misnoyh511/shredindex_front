import { atom } from 'recoil';

export const showLogin = atom<boolean>({
  key: 'showLoginState',
  default: false,
});
