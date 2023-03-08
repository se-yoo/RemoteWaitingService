import {
  LOAD_NOTICE_LIST,
  RESET_EMPTY_NOTICE,
  SET_NOTICE, 
  SET_NOTICE_DESCRIPTION, 
  SET_NOTICE_TARGET, 
  SET_NOTICE_TITLE, 
  UPLOAD_NOTICE,
  LOAD_USER_NOTICE_LIST
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
    case RESET_EMPTY_NOTICE: 
      return {
        ...state,
        _id: "new",
        title: "",
        description: "",
        target: NOTICE_TARGET.ALL,
        createDate: "",
        error: null
      }
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
        _id: newState._id,
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
    case UPLOAD_NOTICE: 
      return {
        ...state,
        success: action.payload
      }
    case LOAD_USER_NOTICE_LIST:
      return {
        ...state,
        noticeList: action.payload
      }
    default:
      return state;
  }
}