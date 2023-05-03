import {
  LOAD_EVENT_ANSWER_LIST,
  LOAD_EVENT_ANSWER_DETAIL,
  EDIT_EVENT_ANSWER,
  SET_ANSWER,
} from "../actions/types";
import { PARTICIPANT_STATUS } from "../../utils/code";

const initialState = {
  _id: "new",
  status: PARTICIPANT_STATUS.NONE,
  writer: {},
  answers: [],
  participantDate: "",

  eventAnswers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENT_ANSWER_LIST:
      return {
        ...state,
        eventAnswers: [...action.payload.eventAnswers],
        error: null,
      };
    case LOAD_EVENT_ANSWER_DETAIL:
      return {
        ...state,
        ...action.payload.eventAnswer,
        error: null,
      };
    case EDIT_EVENT_ANSWER:
      return {
        ...state,
        ...action.payload.eventAnswer,
        success: action.payload,
      };
    case SET_ANSWER: {
      let answers = [...state.answers];
      answers[action.payload.index] = action.payload.newValue;

      return {
        ...state,
        answers: answers,
      };
    }
    default:
      return state;
  }
}
