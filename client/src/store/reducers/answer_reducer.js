import { 
  USER_ANSWER,
} from "../actions/types";

export default function(state = {}, action) {
  switch(action.type){
    case USER_ANSWER:
      return {
        ...state, 
        answer: action.payload 
      }
    default:
      return state;
  }
}