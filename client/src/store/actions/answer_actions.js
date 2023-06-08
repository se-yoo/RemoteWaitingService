import {
  ERR_EVENT,
  LOAD_EVENT_ANSWER_LIST,
  LOAD_EVENT_ANSWER_DETAIL,
  EDIT_EVENT_ANSWER,
  SET_EVENT_ANSWER,
  RESET_EMPTY_EVENT_ANSWER_LIST,
} from "./types";
import { EVENT_ANSWER_SERVER } from "./api";
import axios from "axios";

/**
 * @method loadEventAnswerList
 * @param {Object} dataToSubmit 검색 조건
 * @note 이벤트 답변 목록을 불러오는 함수
 */
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

/**
 * @method loadEventAnswerDetail
 * @param {Object} dataToSubmit 검색 조건
 * @note 이벤트 답변 상세 정보를 불러오는 함수
 */
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

/**
 * @method createEventAnswer
 * @param {Object} dataToSubmit 생성할 답변 정보
 * @note 이벤트 답변을 생성하는 함수
 */
export function createEventAnswer(dataToSubmit) {
  const request = axios
    .post(`${EVENT_ANSWER_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_EVENT_ANSWER,
    payload: request,
  };
}

/**
 * @method updateEventAnswer
 * @param {Object} dataToSubmit 수정할 답변 정보
 * @note 이벤트 답변을 수정하는 함수
 */
export function updateEventAnswer(dataToSubmit) {
  const request = axios
    .put(`${EVENT_ANSWER_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_EVENT_ANSWER,
    payload: request,
  };
}

/**
 * @method resetEmptyEventAnswerList
 * @note 이벤트 답변 목록을 초기화하는 함수
 */
export function resetEmptyEventAnswerList() {
  return { type: RESET_EMPTY_EVENT_ANSWER_LIST };
}

/**
 * @method setEventAnswer
 * @param {Number} index 설정할 답변 index
 * @param {Object} newValue 설정할 답변 정보
 * @note 이벤트 답변 정보를 설정하는 함수
 */
export function setEventAnswer(index, newValue) {
  return {
    type: SET_EVENT_ANSWER,
    payload: {
      index,
      newValue,
    },
  };
}

/**
 * @method updateEventAnswerWinner
 * @param {Object} dataToSubmit 수정할 답변 정보
 * @note 이벤트 답변의 당첨 여부를 수정하는 함수
 */
export function updateEventAnswerWinner(dataToSubmit) {
  const request = axios
    .put(`${EVENT_ANSWER_SERVER}/winner`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_EVENT_ANSWER,
    payload: request,
  };
}
