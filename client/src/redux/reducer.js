// reducer 함수는 이전 state와 action 객체를 받아 next state를 리턴한다.
import * as types from './actionTypes';

// state의 초기값이 undefined 일 경우 에러 발생. 초기값을 비워두려면 null 사용.
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case types.NEW_USER:
      return { ...state, register: action.payload };

    default:
      return state;
  }
};

export default userReducer;
