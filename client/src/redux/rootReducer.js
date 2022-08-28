import { combineReducers } from 'redux';
// CombineReducer는 여러 리듀서를 하나로 합쳐주는 역할이다.
import userReducer from './reducer';
const rootReducer = combineReducers({
  // 회원관리 기능의 여러 리듀서들을 넣어 하나로 합친다.
  user: userReducer,
});

export default rootReducer;
