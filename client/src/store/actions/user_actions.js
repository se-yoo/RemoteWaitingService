import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  MYPAGE_USER,
  MYPAGE_USER_EDIT,
} from './types';
import { USER_SERVER } from './api';

export function mypageUserEdit(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/mypage/edit`,dataToSubmit)
  .then(response => response.data);

  return {
    type: MYPAGE_USER_EDIT,
    payload: request
  }
}

export function mypageUser(){
  const request = axios.post(`${USER_SERVER}/mypage`)
  .then(response => response.data);

  return {
    type: MYPAGE_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
    .then(response => response.data);
  
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export function loginUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function auth(){
  const request = axios.get(`${USER_SERVER}/auth`)
  .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  }
}

export function logoutUser(){
  const request = axios.get(`${USER_SERVER}/logout`)
  .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  }
}