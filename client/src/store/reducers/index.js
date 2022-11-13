import { combineReducers } from "redux";
import user from './user_reducer';
import event from './event_reducer';

const rootReducer = combineReducers({
  user,
  event
})

export default rootReducer;