import { atom } from 'recoil';

export type PostLoginAction = 'showMembershipModal' | null;

export const postLoginAction = atom<PostLoginAction>({
  key: 'postLoginActionState',
  default: null,
});
