import {
  LOAD_EVENT_ANSWER_LIST,
  USER_ANSWER,
  USER_EVENT_LIST,
  USER_EVENT_DETAIL,
  UPDATE_ANSWER,
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
    case USER_EVENT_DETAIL:
      return {
        ...state, 
        userEventDetail: action.payload 
      }
    case UPDATE_ANSWER: 
      return {
        ...state,
        success: action.payload
      }
    default:
      return state;
  }
}