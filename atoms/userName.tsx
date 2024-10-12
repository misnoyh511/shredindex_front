import { atom } from 'recoil';

export const loggedInUserName = atom<string>({
  key: 'getLoggedInUserName',
  default: '',
});
