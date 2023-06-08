import axios from "axios";
import {
  LOGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  RESET_EMPTY_USER,
  LOAD_USER_DETAIL,
  EDIT_USER,
  ERR_USER,
  SET_USER_PROPERTY,
} from "./types";
import { USER_SERVER } from "./api";

/**
 * @method registerUser
 * @param {Object} dataToSubmit 가입할 사용자 정보
 * @note 사용자 계정을 생성하는 함수
 */
export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_USER,
    payload: request,
  };
}

/**
 * @method loginUser
 * @param {Object} dataToSubmit 로그인할 사용자 정보
 * @note 로그인하는 함수
 */
export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

/**
 * @method auth
 * @note 로그인된 사용자 정보를 불러오는 함수
 */
export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

/**
 * @method logoutUser
 * @note 로그아웃하는 함수
 */
export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

/**
 * @method resetEmptyUser
 * @note 사용자 정보를 초기화하는 함수
 */
export function resetEmptyUser() {
  return { type: RESET_EMPTY_USER };
}

/**
 * @method loadUserDetail
 * @note 로그인된 사용자 상세 정보를 불러오는 함수
 */
export function loadUserDetail() {
  return (dispatch) => {
    axios
      .get(`${USER_SERVER}`)
      .then((res) => dispatch({ type: LOAD_USER_DETAIL, payload: res.data }))
      .catch((err) =>
        dispatch({
          type: ERR_USER,
          payload: {
            error: err,
            message: "사용자 정보를 불러오는데 실패하였습니다.",
            from: LOAD_USER_DETAIL,
          },
        }),
      );
  };
}

/**
 * @method updateUser
 * @param {Object} dataToSubmit 수정할 사용자 정보
 * @note 사용자 정보를 수정하는 함수
 */
export function updateUser(dataToSubmit) {
  const request = axios
    .put(`${USER_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_USER,
    payload: request,
  };
}

/**
 * @method setUserProperty
 * @param {String} name 설정할 사용자 속성
 * @param {Object} newValue 설정할 사용자 정보
 * @note 사용자 정보를 설정하는 함수
 */
export function setUserProperty(name, newValue) {
  let user = {};
  user[name] = newValue;

  return {
    type: SET_USER_PROPERTY,
    payload: user,
  };
}

/**
 * @method deleteUser
 * @note 사용자를 비활성화하는 함수
 */
export function deleteUser() {
  const request = axios
    .put(`${USER_SERVER}/active`)
    .then((response) => response.data);

  return {
    type: RESET_EMPTY_USER,
    payload: request,
  };
}
