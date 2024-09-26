import {atom} from "recoil";

export const showLocationTrayState = atom<boolean>({
  key: 'showLocationTrayState',
  default: false,
});

