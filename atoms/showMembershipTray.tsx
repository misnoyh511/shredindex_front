import { atom } from 'recoil';

export const showMembershipTray = atom<boolean>({
  key: 'showMembershipTray',
  default: false,
});
