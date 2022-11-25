import {
  LOAD_EVENT_ANSWER_LIST
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
    default:
      return state;
  }
}