import {
  ERR_EVENT,
  LOAD_EVENT_ANSWER_LIST,
  LOAD_EVENT_ANSWER_DETAIL,
  EDIT_EVENT_ANSWER,
  SET_ANSWER,
} from "./types";
import { EVENT_ANSWER_SERVER } from "./api";
import axios from "axios";

export function loadEventAnswerList(dataToSubmit) {
  return (dispatch) => {
    axios
      .get(`${EVENT_ANSWER_SERVER}`, { params: dataToSubmit })
      .then((res) =>
        dispatch({ type: LOAD_EVENT_ANSWER_LIST, payload: res.data }),
      )
      .catch((err) =>
        dispatch({
          type: ERR_EVENT,
          payload: {
            error: err,
            message: "이벤트의 답변 목록을 불러오는데 실패하였습니다.",
            from: LOAD_EVENT_ANSWER_LIST,
          },
        }),
      );
  };
}

export function loadEventAnswerDetail(dataToSubmit) {
  return (dispatch) => {
    axios
      .get(`${EVENT_ANSWER_SERVER}`, { params: dataToSubmit })
      .then((res) =>
        dispatch({ type: LOAD_EVENT_ANSWER_DETAIL, payload: res.data }),
      )
      .catch((err) =>
        dispatch({
          type: ERR_EVENT,
          payload: {
            error: err,
            message: "이벤트의 답변 정보를 불러오는데 실패하였습니다.",
            from: LOAD_EVENT_ANSWER_DETAIL,
          },
        }),
      );
  };
}

export function createAnswer(dataToSubmit) {
  const request = axios
    .post(`${EVENT_ANSWER_SERVER}/create`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_EVENT_ANSWER,
    payload: request,
  };
}

export function updateAnswer(dataToSubmit) {
  const request = axios
    .put(`${EVENT_ANSWER_SERVER}/update`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_EVENT_ANSWER,
    payload: request,
  };
}

export function updateWinner(dataToSubmit) {
  const request = axios
    .put(`${EVENT_ANSWER_SERVER}/updateWin`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_EVENT_ANSWER,
    payload: request,
  };
}

export function setAnswer(index, newValue) {
  return {
    type: SET_ANSWER,
    payload: {
      index,
      newValue,
    },
  };
}
