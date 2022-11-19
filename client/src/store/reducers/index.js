import { combineReducers } from "redux";
import user from './user_reducer';
import event from './event_reducer';
import notice from './notice_reducer';

const rootReducer = combineReducers({
  user,
  event,
  notice
})

export default rootReducer;