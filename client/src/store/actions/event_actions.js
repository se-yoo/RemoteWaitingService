import { 
  ADD_EVENT_QUESTION, 
  DELETE_EVENT_QUESTION, 
  ERR_EVENT, 
  LOAD_EVENT_DETAIL, 
  LOAD_EVENT_LIST, 
  MOVE_EVENT_QUESTION, 
  RESET_EMPTY_EVENT, 
  SET_EVENT_DESCRIPTION, 
  SET_EVENT_END_DATE, 
  SET_EVENT_NO_LIMIT_DATE, 
  SET_EVENT_OPTION_CD, 
  SET_EVENT_START_DATE, 
  SET_EVENT_TITLE, 
  UPDATE_EVENT_QUESTION,
  UPLOAD_EVENT,
  SET_USER_EVENT_JOIN,
} from "./types";
import { ANSWER_TYPE } from "../../utils/code";
import { arrayMoveImmutable } from 'array-move';
import { EVENT_SERVER } from "./api";
import axios from "axios";

export function loadEventList() {
  return (dispatch) => {
    axios
      .get(`${EVENT_SERVER}`)
      .then( res => dispatch({ type: LOAD_EVENT_LIST, payload: res.data }))
      .catch( err => dispatch({ 
        type: ERR_EVENT, 
        payload: {
          error: err,
          message: "이벤트 목록을 불러오는데 실패하였습니다.",
          from: LOAD_EVENT_LIST
        }
      }));
  }
}

export function loadEventDetail(dataToSubmit) {
  return (dispatch) => {
    axios
      .get(`${EVENT_SERVER}`, { params: dataToSubmit })
      .then( res => dispatch({ type: LOAD_EVENT_DETAIL, payload: res.data }))
      .catch( err => dispatch({ 
        type: ERR_EVENT, 
        payload: {
          error: err,
          message: "이벤트 정보를 불러오는데 실패하였습니다.",
          from: LOAD_EVENT_DETAIL
        }
      }));
  }
}

export function createEvent(dataToSubmit) {
  const request = axios.post(`${EVENT_SERVER}/create`, dataToSubmit)
    .then(response => response.data);
  
  return {
    type: UPLOAD_EVENT,
    payload: request
  }
}

export function updateEvent(dataToSubmit) {
  const request = axios.post(`${EVENT_SERVER}/update`, dataToSubmit)
    .then(response => response.data);
  
  return {
    type: UPLOAD_EVENT,
    payload: request
  }
}

//사용자 참여 페이지 load
export function loadUserEventJoin(eventId){
  const request = axios.post(`${EVENT_SERVER}/userEventSelect`,eventId)
  .then(response => response.data);

  return {
    type: SET_USER_EVENT_JOIN,
    payload: request
  }
}




export function resetEmptyEvent() {
  return { type: RESET_EMPTY_EVENT }
}

export function setEventTitle(newTitle){
  return {
    type: SET_EVENT_TITLE,
    payload: newTitle
  }
}

export function setEventDescription(newDescription){
  return {
    type: SET_EVENT_DESCRIPTION,
    payload: newDescription
  }
}

export function addEventQuestion() {
  const newQuestion = {
    tempId: `question-${new Date().getTime()}`,
    question: "",
    answerType: ANSWER_TYPE.TEXT,
    required: false
  };

  return {
    type: ADD_EVENT_QUESTION,
    payload: newQuestion
  }
}

export function moveEventQuestion(questions, { oldIndex, newIndex }) {
  const newQuestions = arrayMoveImmutable([...questions], oldIndex, newIndex);

  return {
    type: MOVE_EVENT_QUESTION,
    payload: newQuestions
  }
}

export function updateEventQuestion(index, newValue) {
  return {
    type: UPDATE_EVENT_QUESTION,
    payload: {
      index, 
      newValue
    }
  }
}

export function deleteEventQuestion(index) {
  return {
    type: DELETE_EVENT_QUESTION,
    payload: index
  }
}

export function setEventStartDate(newValue){
  return {
    type: SET_EVENT_START_DATE,
    payload: newValue
  }
}

export function setEventEndDate(newValue){
  return {
    type: SET_EVENT_END_DATE,
    payload: newValue
  }
}

export function setEventNoLimitDate(newValue){
  return {
    type: SET_EVENT_NO_LIMIT_DATE,
    payload: newValue
  }
}

export function setEventOptionCd(newValue){
  return {
    type: SET_EVENT_OPTION_CD,
    payload: newValue
  }
}