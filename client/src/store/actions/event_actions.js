import {
  ERR_EVENT,
  LOAD_EVENT_DETAIL,
  LOAD_EVENT_LIST,
  RESET_EMPTY_EVENT,
  SET_EVENT_DESCRIPTION,
  SET_EVENT_END_DATE,
  SET_EVENT_NO_LIMIT_DATE,
  SET_EVENT_OPTION_CD,
  SET_EVENT_START_DATE,
  SET_EVENT_TITLE,
  ADD_EVENT_QUESTION,
  UPDATE_EVENT_QUESTION,
  MOVE_EVENT_QUESTION,
  DELETE_EVENT_QUESTION,
  EDIT_EVENT,
} from "./types";
import { ANSWER_TYPE } from "../../utils/code";
import { arrayMoveImmutable } from "array-move";
import { EVENT_SERVER } from "./api";
import axios from "axios";

/**
 * @method loadEventList
 * @param {Object} dataToSubmit 검색 조건
 * @note 이벤트 목록을 불러오는 함수
 */
export function loadEventList(dataToSubmit) {
  return (dispatch) => {
    axios
      .get(`${EVENT_SERVER}`, { params: dataToSubmit })
      .then((res) => dispatch({ type: LOAD_EVENT_LIST, payload: res.data }))
      .catch((err) =>
        dispatch({
          type: ERR_EVENT,
          payload: {
            error: err,
            message: "이벤트 목록을 불러오는데 실패하였습니다.",
            from: LOAD_EVENT_LIST,
          },
        }),
      );
  };
}

/**
 * @method loadEventDetail
 * @param {Object} dataToSubmit 검색 조건
 * @note 이벤트 상세 정보를 불러오는 함수
 */
export function loadEventDetail(dataToSubmit) {
  return (dispatch) => {
    axios
      .get(`${EVENT_SERVER}`, { params: dataToSubmit })
      .then((res) => dispatch({ type: LOAD_EVENT_DETAIL, payload: res.data }))
      .catch((err) =>
        dispatch({
          type: ERR_EVENT,
          payload: {
            error: err,
            message: "이벤트 정보를 불러오는데 실패하였습니다.",
            from: LOAD_EVENT_DETAIL,
          },
        }),
      );
  };
}

/**
 * @method createEvent
 * @param {Object} dataToSubmit 생성할 이벤트 정보
 * @note 이벤트를 생성하는 함수
 */
export function createEvent(dataToSubmit) {
  const request = axios
    .post(`${EVENT_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_EVENT,
    payload: request,
  };
}

/**
 * @method updateEvent
 * @param {Object} dataToSubmit 수정할 이벤트 정보
 * @note 이벤트를 수정하는 함수
 */
export function updateEvent(dataToSubmit) {
  const request = axios
    .put(`${EVENT_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_EVENT,
    payload: request,
  };
}

/**
 * @method deleteEvent
 * @param {Object} dataToSubmit 삭제할 이벤트 정보
 * @note 이벤트를 삭제하는 함수
 */
export function deleteEvent(dataToSubmit) {
  const request = axios
    .delete(`${EVENT_SERVER}`, { params: dataToSubmit })
    .then((response) => response.data);

  return {
    type: EDIT_EVENT,
    payload: request,
  };
}

/**
 * @method resetEmptyEvent
 * @note 이벤트 정보를 초기화하는 함수
 */
export function resetEmptyEvent() {
  return { type: RESET_EMPTY_EVENT };
}

/**
 * @method setEventTitle
 * @param {String} newTitle 설정할 이벤트 제목
 * @note 이벤트 제목을 설정하는 함수
 */
export function setEventTitle(newTitle) {
  return {
    type: SET_EVENT_TITLE,
    payload: newTitle,
  };
}

/**
 * @method setEventDescription
 * @param {String} newDescription 설정할 이벤트 설명
 * @note 이벤트 설명을 설정하는 함수
 */
export function setEventDescription(newDescription) {
  return {
    type: SET_EVENT_DESCRIPTION,
    payload: newDescription,
  };
}

/**
 * @method addEventQuestion
 * @note 이벤트의 새로운 문항을 추가하는 함수
 */
export function addEventQuestion() {
  const newQuestion = {
    tempId: `question-${new Date().getTime()}`,
    question: "",
    answerType: ANSWER_TYPE.TEXT,
    required: false,
  };

  return {
    type: ADD_EVENT_QUESTION,
    payload: newQuestion,
  };
}

/**
 * @method moveEventQuestion
 * @param {Array} questions 문항 목록
 * @param {Object} 설정할 index 정보
 * @note 이벤트 문항 순서를 설정하는 함수
 */
export function moveEventQuestion(questions, { oldIndex, newIndex }) {
  const newQuestions = arrayMoveImmutable([...questions], oldIndex, newIndex);

  return {
    type: MOVE_EVENT_QUESTION,
    payload: newQuestions,
  };
}

/**
 * @method updateEventQuestion
 * @param {Number} index 수정할 문항 index
 * @param {Object} newValue 수정할 문항
 * @note 이벤트 문항을 수정하는 함수
 */
export function updateEventQuestion(index, newValue) {
  return {
    type: UPDATE_EVENT_QUESTION,
    payload: {
      index,
      newValue,
    },
  };
}

/**
 * @method deleteEventQuestion
 * @param {Number} index 삭제할 문항 index
 * @note 이벤트 문항을 삭제하는 함수
 */
export function deleteEventQuestion(index) {
  return {
    type: DELETE_EVENT_QUESTION,
    payload: index,
  };
}

/**
 * @method setEventStartDate
 * @param {String} newValue 설정할 이벤트 시작일
 * @note 이벤트 시작일을 설정하는 함수
 */
export function setEventStartDate(newValue) {
  return {
    type: SET_EVENT_START_DATE,
    payload: newValue,
  };
}

/**
 * @method setEventEndDate
 * @param {String} newValue 설정할 이벤트 종료일
 * @note 이벤트 종료일을 설정하는 함수
 */
export function setEventEndDate(newValue) {
  return {
    type: SET_EVENT_END_DATE,
    payload: newValue,
  };
}

/**
 * @method setEventNoLimitDate
 * @param {Boolean} newValue 설정할 이벤트 기간 제한없음 유무
 * @note 이벤트 기간 제한없음 유무를 설정하는 함수
 */
export function setEventNoLimitDate(newValue) {
  return {
    type: SET_EVENT_NO_LIMIT_DATE,
    payload: newValue,
  };
}

/**
 * @method setEventOptionCd
 * @param {Number} newValue 설정할 이벤트 옵션
 * @note 이벤트 옵션을 설정하는 함수
 */
export function setEventOptionCd(newValue) {
  return {
    type: SET_EVENT_OPTION_CD,
    payload: newValue,
  };
}
