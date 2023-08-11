import { SET_NICKNAME } from './action-types';

export const setNickname = (nickname) => ({
  type: SET_NICKNAME,
  payload: nickname
});
