import { atom } from 'recoil';
import { UserProfileType } from '../types/userProfileTypes';

export const loggedInUserProfile = atom<UserProfileType | null>({
  key: 'loggedInUserProfile',
  default: null,
});
