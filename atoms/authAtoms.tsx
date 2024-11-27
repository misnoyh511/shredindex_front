import { atom } from 'recoil';
import type { UserProfile } from '../types/userTypes';

export const userState = atom<UserProfile | null>({
  key: 'userState',
  default: null,
});

export const authLoadingState = atom<boolean>({
  key: 'authLoadingState',
  default: false,
});

export const authErrorState = atom<string | null>({
  key: 'authErrorState',
  default: null,
});

export const showLoginModalState = atom<'login' | 'signup' | null>({
  key: 'showLoginModalState',
  default: null,
});

export type PostLoginAction = 'showMembershipModal' | null;
export const postLoginAction = atom<PostLoginAction>({
  key: 'postLoginActionState',
  default: null,
});

export const redirectAfterLoginState = atom<string | null>({
  key: 'redirectAfterLoginState',
  default: null,
});
