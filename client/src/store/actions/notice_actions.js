import { 
  LOAD_NOTICE_LIST,
  SET_NOTICE, 
  SET_NOTICE_DESCRIPTION, 
  SET_NOTICE_TARGET, 
  SET_NOTICE_TITLE,
  ERR_EVENT,
  RESET_EMPTY_NOTICE,
  UPLOAD_NOTICE,
  LOAD_USER_NOTICE_LIST
} from "./types";
import { NOTICE_SERVER } from "./api";
import axios from "axios";

export function loadUserNoticeList(dataToSubmit){
  const request = axios.post(`${NOTICE_SERVER}/loadUserNoticeList`, dataToSubmit)
    .then(response => response.data);
  
  return {
    type: LOAD_USER_NOTICE_LIST,
    payload: request
  }
}

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

export function createNotice(dataToSubmit, telnoIndex) {
  const params = {
    notice: dataToSubmit,
    telnoIndex: telnoIndex
  };

  const request = axios.post(`${NOTICE_SERVER}/create`, params)
    .then(response => response.data);
  
  return {
    type: UPLOAD_NOTICE,
    payload: request
  }
}

export function updateNotice(dataToSubmit) {
  const request = axios.put(`${NOTICE_SERVER}/update`, dataToSubmit)
    .then(response => response.data);
  
  return {
    type: UPLOAD_NOTICE,
    payload: request
  }
}

export function deleteNotice(dataToSubmit) {
  const request = axios.delete(`${NOTICE_SERVER}/delete`, { params: dataToSubmit })
    .then(response => response.data);
  
  return {
    type: UPLOAD_NOTICE,
    payload: request
  }
}

export function resetEmptyNotice() {
  return { type: RESET_EMPTY_NOTICE }
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