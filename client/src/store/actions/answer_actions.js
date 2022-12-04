import { 
  ERR_EVENT,
  LOAD_EVENT_ANSWER_LIST,
  USER_ANSWER,
  USER_EVENT_LIST,
  USER_EVENT_DETAIL,
  UPDATE_ANSWER,
  GUEST_ANSWER,
  ANSWER_NUMBER,
} from "./types";
import { EVENT_ANSWER_SERVER } from "./api";
import axios from "axios";

export function loadEventAnswerList(dataToSubmit) {
  return (dispatch) => {
    axios
      .get(`${EVENT_ANSWER_SERVER}`, { params: dataToSubmit })
      .then( res => dispatch({ type: LOAD_EVENT_ANSWER_LIST, payload: res.data }))
      .catch( err => dispatch({ 
        type: ERR_EVENT, 
        payload: {
          error: err,
          message: "이벤트의 답변 목록을 불러오는데 실패하였습니다.",
          from: LOAD_EVENT_ANSWER_LIST
        }
      }));
  }
}

export function answerRowNum(dataToSubmit){
  const request = axios.post(`${EVENT_ANSWER_SERVER}/AnswerRowNum`,dataToSubmit)
  .then(response => response.data);

  return {
    type: ANSWER_NUMBER,
    payload: request
  }
}


export function guestCreateAnswer(dataToSubmit){
  const request = axios.post(`${EVENT_ANSWER_SERVER}/guestCreate`,dataToSubmit)
  .then(response => response.data);

  return {
    type: GUEST_ANSWER,
    payload: request
  }
}

export function createAnswer(dataToSubmit){
  const request = axios.post(`${EVENT_ANSWER_SERVER}/create`,dataToSubmit)
  .then(response => response.data);

  return {
    type: USER_ANSWER,
    payload: request
  }
}

export function updateAnswer(dataToSubmit) {
  const request = axios.put(`${EVENT_ANSWER_SERVER}/update`, dataToSubmit)
    .then(response => response.data);
  
  return {
    type: UPDATE_ANSWER,
    payload: request
  }
}

export function updateWinner(dataToSubmit) {
  const request = axios.put(`${EVENT_ANSWER_SERVER}/updateWin`, dataToSubmit)
    .then(response => response.data);
  
  return {
    type: UPDATE_ANSWER,
    payload: request
  }
}

//사용자 이벤트 리스트 load
export function loadUserEventList(dataToSubmit){
  const request = axios.post(`${EVENT_ANSWER_SERVER}/userEventListSelect`,dataToSubmit)
  .then(response => response.data);

  return {
    type: USER_EVENT_LIST,
    payload: request
  }
}

//사용자 이벤트 detail load
export function loadUserEventDetail(dataToSubmit){
  const request = axios.post(`${EVENT_ANSWER_SERVER}/userAnswerSelect`,dataToSubmit)
  .then(response => response.data);

  return {
    type: USER_EVENT_DETAIL,
    payload: request
  }
}