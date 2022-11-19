import { SET_NOTICE } from "./types";

export function setNotice(newValue) {
  return {
    type: SET_NOTICE,
    payload: newValue
  }
}