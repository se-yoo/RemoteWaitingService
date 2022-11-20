import { theme } from "../styles/theme"

export const ROLE_TYPE = {
  EVENT_PARTICIPANT: 0,
  EVENT_MANAGER: 1
}

export const EVENT_RESULT_TYPE = {
  IN_PROGRESS: 0,
  WIN: 1,
  NOT_WON: 2
}

export const EVENT_STATUS_TYPE = {
  OPEN_SOON: 0,
  IN_PROGRESS: 1,
  ENDED: 2
}

export const EVENT_STATUS_COLOR = {
  OPEN_SOON: "yellow",
  IN_PROGRESS: "primary",
  ENDED: "grey"
}

export const EVENT_OPTION = {
  WAITING: 0,
  FCFS: 1,
  RANDOM: 2
}

export const EVENT_OPTION_TEXT = [
  { text: '웨이팅 이벤트', value: EVENT_OPTION.WAITING },
  { text: '선착순 이벤트', value: EVENT_OPTION.FCFS },
  { text: '랜덤 선정 이벤트', value: EVENT_OPTION.RANDOM }
]

export const ANSWER_TYPE = {
  TEXT: 0,
  TEXT_TELNO: 1,
  TEXT_EMAIL: 2,
  TEXTAREA: 3,
  RADIO: 4,
  CHECKBOX: 5,
  DATE: 6,
  NUMBER: 7
}

export const ANSWER_TYPE_TEXT = [
  { text: '텍스트(일반)', value: ANSWER_TYPE.TEXT },
  { text: '텍스트(전화번호)', value: ANSWER_TYPE.TEXT_TELNO },
  { text: '텍스트(이메일)', value: ANSWER_TYPE.TEXT_EMAIL },
  { text: '텍스트(여러줄)', value: ANSWER_TYPE.TEXTAREA },
  { text: '라디오 버튼', value: ANSWER_TYPE.RADIO },
  { text: '체크박스', value: ANSWER_TYPE.CHECKBOX },
  { text: '날짜', value: ANSWER_TYPE.DATE },
  { text: '숫자', value: ANSWER_TYPE.NUMBER },
]

export const PARTICIPANT_STATUS = {
  NONE: 0,
  WIN: 1,
  ENTER: 2,
  ENTER_CANCEL: 3
}

export const PARTICIPANT_STATUS_INFO = [
  { text: '-', value: PARTICIPANT_STATUS.NONE, color: theme.palette.black },
  { text: '당첨', value: PARTICIPANT_STATUS.WIN, color: theme.palette.primary.main }
]

export const WAITING_PARTICIPANT_STATUS_INFO = [
  { text: '대기', value: PARTICIPANT_STATUS.NONE, color: theme.palette.black },
  { text: '입장 완료', value: PARTICIPANT_STATUS.ENTER, color: theme.palette.primary.main },
  { text: '입장 취소', value: PARTICIPANT_STATUS.ENTER_CANCEL, color: theme.palette.red.main }
]

export const NOTICE_TARGET = {
  ALL: 0,
  WINNER: 1,
  NON_WINNER: 2
}

export const NOTICE_TARGET_TEXT = [
  { text: '참여자 전원', value: NOTICE_TARGET.ALL },
  { text: '당첨자', value: NOTICE_TARGET.WINNER },
  { text: '미당첨자', value: NOTICE_TARGET.NON_WINNER }
]