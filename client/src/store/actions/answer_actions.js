import { 
  USER_ANSWER,
} from "./types";
import { ANSWER_SERVER } from "./api";
import axios from "axios";


export function createAnswer(dataToSubmit){
  const request = axios.post(`${ANSWER_SERVER}/create`,dataToSubmit)
  .then(response => response.data);

  return {
    type: USER_ANSWER,
    payload: request
  }
}
