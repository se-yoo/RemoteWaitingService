import { 
  ADD_EVENT_QUESTION, 
  DELETE_EVENT_QUESTION, 
  MOVE_EVENT_QUESTION, 
  SET_EVENT_DESCRIPTION, 
  SET_EVENT_END_DATE, 
  SET_EVENT_NO_LIMIT_DATE, 
  SET_EVENT_OPTION_CD, 
  SET_EVENT_START_DATE, 
  SET_EVENT_TITLE, 
  UPDATE_EVENT_QUESTION
} from "../actions/types";
import { EVENT_OPTION } from "../../utils/code";

const initialState = {
  title: "제목없는 이벤트",
  description: "",
  questions: [],
  startDate: null,
  endDate: null,
  noLimitDate: false,
  optionCd: EVENT_OPTION.WAITING,
  userId: '',
  createDate: ''
};

export default function(state = initialState, action) {
  switch(action.type){
    case SET_EVENT_TITLE:
      return  {
        ...state,
        title: action.payload
      }
    case SET_EVENT_DESCRIPTION:
      return  {
        ...state,
        description: action.payload
      }
    case ADD_EVENT_QUESTION: {
      const questions = [...state.questions, action.payload];
      return  {
        ...state,
        questions: questions
      }
    }
    case MOVE_EVENT_QUESTION: {
      const questions = [...action.payload];

      return  {
        ...state,
        questions: questions
      }
    }
    case UPDATE_EVENT_QUESTION: {
      let questions = [...state.questions];
      questions[action.payload.index] = {
        ...state.questions[action.payload.index],
        ...action.payload.newValue
      };
      
      return  {
        ...state,
        questions: questions
      }
    }
    case DELETE_EVENT_QUESTION: {
      let questions = [...state.questions];
      questions.splice(action.payload, 1);

      return  {
        ...state,
        questions: questions
      }
    }
    case SET_EVENT_START_DATE:
      return  {
        ...state,
        startDate: action.payload
      }
    case SET_EVENT_END_DATE:
      return  {
        ...state,
        endDate: action.payload
      }
    case SET_EVENT_NO_LIMIT_DATE:
      return  {
        ...state,
        startDate: null,
        endDate: null,
        noLimitDate: action.payload
      }
    case SET_EVENT_OPTION_CD:
      return  {
        ...state,
        optionCd: action.payload
      }
    default:
      return state;
  }
}