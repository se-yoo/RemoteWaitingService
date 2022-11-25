import { 
  ERR_EVENT,
  LOAD_EVENT_ANSWER_LIST
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