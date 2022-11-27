import {
  LOAD_EVENT_ANSWER_LIST,
  USER_ANSWER,
  USER_EVENT_LIST,
} from "../actions/types";
import { PARTICIPANT_STATUS } from "../../utils/code";

const initialState = {
  answerId: "new",
  status: PARTICIPANT_STATUS.NONE,
  writer: {},
  answers: [],
  participantDate: "",

  eventAnswers: []
};

export default function(state = initialState, action) {
  switch(action.type){
    case LOAD_EVENT_ANSWER_LIST:
      return {
        ...state,
        eventAnswers: [...action.payload.answers],
        error: null
      }
    case USER_ANSWER:
      return {
        ...state, 
        answer: action.payload 
      }
      
    case USER_EVENT_LIST:
      return {
        ...state, 
        userEventList: action.payload 
      }
    default:
      return state;
  }
}