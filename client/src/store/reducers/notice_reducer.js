import {
  LOAD_NOTICE_LIST,
  SET_NOTICE, 
  SET_NOTICE_DESCRIPTION, 
  SET_NOTICE_TARGET, 
  SET_NOTICE_TITLE 
} from "../actions/types";
import { NOTICE_TARGET } from "../../utils/code";

const initialState = {
  title: "",
  description: "",
  target: NOTICE_TARGET.ALL,
  createDate: "",

  notices: []
};

export default function(state = initialState, action) {
  switch(action.type){
    case LOAD_NOTICE_LIST:
      return {
        ...state,
        notices: [...action.payload.notices],
        error: null
      }
    case SET_NOTICE: {
      const newState = action.payload;

      return {
        ...state,
        title: newState.title,
        description: newState.description,
        target: newState.target,
        createDate: newState.createDate
      }
    }
    case SET_NOTICE_TITLE:
      return  {
        ...state,
        title: action.payload
      }
    case SET_NOTICE_DESCRIPTION:
      return  {
        ...state,
        description: action.payload
      }
    case SET_NOTICE_TARGET:
      return  {
        ...state,
        target: action.payload
      }
    default:
      return state;
  }
}