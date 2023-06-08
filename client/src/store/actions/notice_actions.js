import {
  ERR_EVENT,
  LOAD_NOTICE_LIST,
  SET_NOTICE,
  SET_NOTICE_DESCRIPTION,
  SET_NOTICE_TARGET,
  SET_NOTICE_TITLE,
  RESET_EMPTY_NOTICE,
  RESET_EMPTY_NOTICE_LIST,
  EDIT_NOTICE,
} from "./types";
import { NOTICE_SERVER } from "./api";
import axios from "axios";

/**
 * @method loadNoticeList
 * @param {Object} dataToSubmit 검색 조건
 * @note 공지 목록을 불러오는 함수
 */
export function loadNoticeList(dataToSubmit) {
  return (dispatch) => {
    axios
      .get(`${NOTICE_SERVER}`, { params: dataToSubmit })
      .then((res) => dispatch({ type: LOAD_NOTICE_LIST, payload: res.data }))
      .catch((err) =>
        dispatch({
          type: ERR_EVENT,
          payload: {
            error: err,
            message: "이벤트의 공지 목록을 불러오는데 실패하였습니다.",
            from: LOAD_NOTICE_LIST,
          },
        }),
      );
  };
}

/**
 * @method createNotice
 * @param {Object} dataToSubmit 생성할 공지 정보
 * @param {Number} phoneNumberIndex 이벤트 문항 중 전화번호 정보 index
 * @note 공지를 생성하는 함수
 */
export function createNotice(dataToSubmit, phoneNumberIndex) {
  const params = {
    notice: dataToSubmit,
    phoneNumberIndex: phoneNumberIndex,
  };

  const request = axios
    .post(`${NOTICE_SERVER}`, params)
    .then((response) => response.data);

  return {
    type: EDIT_NOTICE,
    payload: request,
  };
}

/**
 * @method updateNotice
 * @param {Object} dataToSubmit 수정할 공지 정보
 * @note 공지를 수정하는 함수
 */
export function updateNotice(dataToSubmit) {
  const request = axios
    .put(`${NOTICE_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_NOTICE,
    payload: request,
  };
}

/**
 * @method deleteNotice
 * @param {Object} dataToSubmit 삭제할 공지 정보
 * @note 공지를 삭제하는 함수
 */
export function deleteNotice(dataToSubmit) {
  const request = axios
    .delete(`${NOTICE_SERVER}`, { params: dataToSubmit })
    .then((response) => response.data);

  return {
    type: EDIT_NOTICE,
    payload: request,
  };
}

/**
 * @method resetEmptyNotice
 * @note 공지 정보를 초기화하는 함수
 */
export function resetEmptyNotice() {
  return { type: RESET_EMPTY_NOTICE };
}

/**
 * @method resetEmptyNoticeList
 * @note 공지 목록을 초기화하는 함수
 */
export function resetEmptyNoticeList() {
  return { type: RESET_EMPTY_NOTICE_LIST };
}

/**
 * @method setNotice
 * @param {Object} newValue 설정할 공지 정보
 * @note 공지 정보를 설정하는 함수
 */
export function setNotice(newValue) {
  return {
    type: SET_NOTICE,
    payload: newValue,
  };
}

/**
 * @method setNoticeTitle
 * @param {String} newTitle 설정할 공지 제목
 * @note 공지 제목을 설정하는 함수
 */
export function setNoticeTitle(newTitle) {
  return {
    type: SET_NOTICE_TITLE,
    payload: newTitle,
  };
}

/**
 * @method setNoticeDescription
 * @param {String} newDescription 설정할 공지 설명
 * @note 공지 설명을 설정하는 함수
 */
export function setNoticeDescription(newDescription) {
  return {
    type: SET_NOTICE_DESCRIPTION,
    payload: newDescription,
  };
}

/**
 * @method setNoticeTarget
 * @param {Number} newTarget 설정할 공지 대상
 * @note 공지 대상을 설정하는 함수
 */
export function setNoticeTarget(newTarget) {
  return {
    type: SET_NOTICE_TARGET,
    payload: newTarget,
  };
}
