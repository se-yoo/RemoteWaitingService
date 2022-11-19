import { NOTICE_TARGET } from "../../utils/code";
import { SET_NOTICE } from "../actions/types";

const initialState = {
  title: "",
  description: "",
  target: NOTICE_TARGET.ALL,
  createDate: ""
};

export default function(state = initialState, action) {
  switch(action.type){
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
    default:
      return state;
  }
}