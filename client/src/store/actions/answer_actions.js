import { 
  ERR_EVENT,
  LOAD_EVENT_ANSWER_LIST,
  USER_ANSWER,
  USER_EVENT_LIST,
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

export function createAnswer(dataToSubmit){
  const request = axios.post(`${EVENT_ANSWER_SERVER}/create`,dataToSubmit)
  .then(response => response.data);

  return {
    type: USER_ANSWER,
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