import React, {  useCallback,useState } from 'react';
import { Box, styled } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';
import AnswerList from '../../../components/AnswerList';
import { EVENT_STATUS_TYPE, EVENT_RESULT_TYPE, PARTICIPANT_STATUS, EVENT_OPTION, NOTICE_TARGET } from '../../../utils/code';
import moment from 'moment';
import UserNoticeInfo from './UserNoticeInfo';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { answerRowNum } from '../../../store/actions/answer_actions';


const stateSuccess={
  BG_COLOR:"rgba(73,111,70,0.1)",
  COLOR:"#496F46"
}

const stateFail={
  BG_COLOR:"rgba(202,55,55,0.1)",
  COLOR:"#CA3737"
}

const stateDefault={
  BG_COLOR:"rgba(166,166,166,0.1)",
  COLOR:"#A6A6A6"
}

const StyledStateBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height:"143px", 
  borderRadius:"20px"
});

const getResultColor = (status) => {
  switch(status) {
    case EVENT_RESULT_TYPE.WIN:
      return stateSuccess;
    case EVENT_RESULT_TYPE.NOT_WON:
      return stateFail;
    default:
      return stateDefault;
  }
}

const waitingMent = (eventId,answerId)=>{
  const dispatch = useDispatch();
  const body={
    eventId:eventId
  }

  const [stateList, setStateList] = useState([]);

  let myNum = -1;
  let frontWaitingNum=0;

  useEffect(()=>{
    dispatch(answerRowNum(body))
    .then(response=>{
      if(response.payload.success){
        //console.log("rowRum : "+JSON.stringify(response.payload.eventList));
        setStateList(response.payload.eventList);
      }
      else{
        console.log(response.payload.err);
      }
    })
  },[])


  stateList.map((event)=>(
    answerId===event._id ? myNum = event.rowNum : ""
  ))

  stateList.map((event, index)=>(
    index+1<myNum ? (event.status !== 0 ? (frontWaitingNum+=1) : ""):""
  ))

  return "대기 번호 "+myNum+"번 / 현재 내 앞 대기팀 "+frontWaitingNum+"팀";

}

const getResultComment=(result,option,eventId,answerId)=>{
  
  if(result===EVENT_RESULT_TYPE.WIN){
    if(option===EVENT_OPTION.WAITING){
      return "웨이팅 입장이 승인되었습니다. 입장을 진행해주세요."
    }
    else{
      return "축하합니다 당첨되셨습니다."
    }
  }
  else if (result===EVENT_RESULT_TYPE.NOT_WON) {
    if(option===EVENT_OPTION.WAITING){
      return "웨이팅 입장이 거절되었습니다. 자세한 내용은 가게에 문의바랍니다."
    }
    else{
      return "아쉽지만 당첨되지 않았습니다."
    }
  }
  else {
    if(option===EVENT_OPTION.WAITING){
      return waitingMent(eventId,answerId);
    }
    else{
      return "진행중인 이벤트 입니다."
    }
  }
}


const UserEventJoinInfo = (props) => {
  const {eventDetail} = props;

  
  const setNoticeTarget=(status)=>{
    switch(status){
      case PARTICIPANT_STATUS.NONE: case PARTICIPANT_STATUS.ENTER_CANCEL:
        return NOTICE_TARGET.NON_WINNER;
      case PARTICIPANT_STATUS.WIN: case PARTICIPANT_STATUS.ENTER:
        return NOTICE_TARGET.WINNER;
      default:
        return NOTICE_TARGET.ALL;
    }
  }

  const getResultOption=useCallback((event)=> {
    const eventStatus = getEventStatus(event);
    if (eventStatus!==EVENT_STATUS_TYPE.ENDED) {
      return EVENT_RESULT_TYPE.DEFAULT
    }
    else{
      if(event.status===PARTICIPANT_STATUS.NONE) {
        if(event.option===EVENT_OPTION.WAITING){
          return EVENT_RESULT_TYPE.DEFAULT;
        }
        return EVENT_RESULT_TYPE.NOT_WON;
      }
      else if (event.status===PARTICIPANT_STATUS.ENTER_CANCEL){
        return EVENT_RESULT_TYPE.NOT_WON;
      }
      else return EVENT_RESULT_TYPE.WIN;
    }
  },[])

  const getEventStatus = useCallback((event)=>{
    const startDate = new Date(event.startDate).getTime();
    const endDate = new Date(event.endDate).getTime();
    const today = Date.now();
    
    if(startDate > today){
      return EVENT_STATUS_TYPE.OPEN_SOON;
    }
    else if(startDate < today && today < endDate){
      return EVENT_STATUS_TYPE.IN_PROGRESS;
    }
    else {
      return EVENT_STATUS_TYPE.ENDED;
    }
  },[])
  
  const stateColor = getResultColor(getResultOption(eventDetail));


  return (
    <>
      <SectionTitle title={"참여 정보"} sx={{ mt: 6 }}/>
      <Box sx={{ mb: 1}} >{moment(eventDetail.participantDate).format('YYYY-MM-DD HH:mm:ss.SSS')}</Box>
      <AnswerList
        hideRequired 
        questions={eventDetail.questions} 
        answers={eventDetail.answers}
      />
      <SectionTitle title={"참여 현황"} sx={{ mt: 3 }}/>
      <StyledStateBox
        sx={{
          backgroundColor:stateColor.BG_COLOR,
          color:stateColor.COLOR 
        }}
      >
        {getResultComment(getResultOption(eventDetail),eventDetail.option,eventDetail.eventId, eventDetail._id)}
      </StyledStateBox>
      <UserNoticeInfo noticeTarget={setNoticeTarget(eventDetail.status)}/>
    </>
  );
};

export default UserEventJoinInfo;