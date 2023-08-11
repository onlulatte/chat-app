import { SET_NICKNAME } from './action-types';

const initialState = {
  nickname: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME:
      return { ...state, nickname: action.payload };
    default:
      return state;
  }
};

export default rootReducer;