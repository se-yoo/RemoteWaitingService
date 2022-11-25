import { 
  LOAD_NOTICE_LIST,
  SET_NOTICE, 
  SET_NOTICE_DESCRIPTION, 
  SET_NOTICE_TARGET, 
  SET_NOTICE_TITLE,
  ERR_EVENT
} from "./types";
import { NOTICE_SERVER } from "./api";
import axios from "axios";

export function loadNoticeList(dataToSubmit) {
  return (dispatch) => {
    axios
      .get(`${NOTICE_SERVER}`, { params: dataToSubmit })
      .then( res => dispatch({ type: LOAD_NOTICE_LIST, payload: res.data }))
      .catch( err => dispatch({ 
        type: ERR_EVENT, 
        payload: {
          error: err,
          message: "이벤트의 공지 목록을 불러오는데 실패하였습니다.",
          from: LOAD_NOTICE_LIST
        }
      }));
  }
}

export function setNotice(newValue) {
  return {
    type: SET_NOTICE,
    payload: newValue
  }
}

export function setNoticeTitle(newTitle){
  return {
    type: SET_NOTICE_TITLE,
    payload: newTitle
  }
}

export function setNoticeDescription(newDescription){
  return {
    type: SET_NOTICE_DESCRIPTION,
    payload: newDescription
  }
}

export function setNoticeTarget(newTarget){
  return {
    type: SET_NOTICE_TARGET,
    payload: newTarget
  }
}