import { 
  SET_NOTICE, 
  SET_NOTICE_DESCRIPTION, 
  SET_NOTICE_TARGET, 
  SET_NOTICE_TITLE 
} from "./types";

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