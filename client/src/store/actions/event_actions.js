import { 
  ADD_EVENT_QUESTION, 
  DELETE_EVENT_QUESTION, 
  MOVE_EVENT_QUESTION, 
  SET_EVENT_DESCRIPTION, 
  SET_EVENT_END_DATE, 
  SET_EVENT_NO_LIMIT_DATE, 
  SET_EVENT_OPTION_CD, 
  SET_EVENT_START_DATE, 
  SET_EVENT_TITLE, 
  UPDATE_EVENT_QUESTION} from "./types";
import { ANSWER_TYPE } from "../../utils/code";
import { arrayMoveImmutable } from 'array-move';

export function setEventTitle(newTitle){
  return {
    type: SET_EVENT_TITLE,
    payload: newTitle
  }
}

export function setEventDescription(newDescription){
  return {
    type: SET_EVENT_DESCRIPTION,
    payload: newDescription
  }
}

export function addEventQuestion() {
  const newQuestion = {
    id: `question-${new Date().getTime()}`,
    label: "",
    answerType: ANSWER_TYPE.TEXT,
    required: false
  };

  return {
    type: ADD_EVENT_QUESTION,
    payload: newQuestion
  }
}

export function moveEventQuestion(questions, { oldIndex, newIndex }) {
  const newQuestions = arrayMoveImmutable([...questions], oldIndex, newIndex);

  return {
    type: MOVE_EVENT_QUESTION,
    payload: newQuestions
  }
}

export function updateEventQuestion(index, newValue) {
  return {
    type: UPDATE_EVENT_QUESTION,
    payload: {
      index, 
      newValue
    }
  }
}

export function deleteEventQuestion(index) {
  return {
    type: DELETE_EVENT_QUESTION,
    payload: index
  }
}

export function setEventStartDate(newValue){
  return {
    type: SET_EVENT_START_DATE,
    payload: newValue
  }
}

export function setEventEndDate(newValue){
  return {
    type: SET_EVENT_END_DATE,
    payload: newValue
  }
}

export function setEventNoLimitDate(newValue){
  return {
    type: SET_EVENT_NO_LIMIT_DATE,
    payload: newValue
  }
}

export function setEventOptionCd(newValue){
  return {
    type: SET_EVENT_OPTION_CD,
    payload: newValue
  }
}