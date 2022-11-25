import {
  LOAD_EVENT_ANSWER_LIST,
  USER_ANSWER,
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
    default:
      return state;
  }
}