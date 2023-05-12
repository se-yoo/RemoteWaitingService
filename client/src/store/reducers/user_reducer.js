import {
  LOGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  RESET_EMPTY_USER,
  LOAD_USER_DETAIL,
  EDIT_USER,
  ERR_USER,
  SET_USER_PROPERTY,
} from "../actions/types";

const initialState = {
  _id: "",
  userId: "",
  password: "",
  passwordConfirm: "",
  name: "",
  birthDay: "",
  phoneNumber: "",
  email: "",
  role: 0,

  userData: {}, // 현재 로그인 정보

  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT_USER:
      return { ...state };
    case RESET_EMPTY_USER:
      return {
        ...state,
        ...initialState,
        userData: state.userData,
        error: null,
      };
    case LOAD_USER_DETAIL:
      return {
        ...initialState,
        userData: state.userData,
        ...action.payload.user,
        error: null,
      };
    case SET_USER_PROPERTY:
      return {
        ...state,
        ...action.payload,
      };
    case EDIT_USER:
      return {
        ...state,
        success: action.payload,
      };
    case ERR_USER:
      return {
        ...state,
        ...initialState,
        error: { ...action.payload },
      };
    default:
      return state;
  }
}
