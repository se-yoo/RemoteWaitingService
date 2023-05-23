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

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function resetEmptyUser() {
  return { type: RESET_EMPTY_USER };
}

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

export function updateUser(dataToSubmit) {
  const request = axios
    .put(`${USER_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_USER,
    payload: request,
  };
}

export function setUserProperty(name, newValue) {
  let user = {};
  user[name] = newValue;

  return {
    type: SET_USER_PROPERTY,
    payload: user,
  };
}

export function deleteUser() {
  const request = axios
    .put(`${USER_SERVER}/active`)
    .then((response) => response.data);

  return {
    type: RESET_EMPTY_USER,
    payload: request,
  };
}
