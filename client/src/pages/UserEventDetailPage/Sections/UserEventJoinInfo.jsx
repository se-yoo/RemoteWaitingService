import React, {  useCallback } from 'react';
import { Box, styled } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';
import AnswerList from '../../../components/AnswerList';
import { EVENT_STATUS_TYPE, EVENT_RESULT_TYPE, PARTICIPANT_STATUS, EVENT_OPTION } from '../../../utils/code';
import moment from 'moment';



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
    case EVENT_RESULT_TYPE.WIN || EVENT_RESULT_TYPE.ENTER:
      return stateSuccess;
    case EVENT_RESULT_TYPE.NOT_WON || EVENT_RESULT_TYPE.ENTER_CANCEL:
      return stateFail;
    default:
      return stateDefault;
  }
}

const getResultComment=(result,option)=>{
  if(result===EVENT_RESULT_TYPE.WIN){
    if(option===EVENT_OPTION.WAITING){
      return "웨이팅 입장"
    }
    else{
      return "축하합니다 당첨되셨습니다."
    }
  }
  else if (result===EVENT_RESULT_TYPE.NOT_WON) {
    if(option===EVENT_OPTION.WAITING){
      return "웨이팅 입장하지 못하셨습니다."
    }
    else{
      return "아쉽지만 당첨되지 않았습니다."
    }
  }
}


const UserEventJoinInfo = (props) => {
  const {eventDetail} = props;

  const getResultOption=useCallback((event)=> {
    const eventStatus = getEventStatus(event);
    console.log("eventStatus : "+eventStatus);
    if (eventStatus!==EVENT_STATUS_TYPE.ENDED) {
      return EVENT_RESULT_TYPE.DEFAULT
    }
    else{
      if(event.status===PARTICIPANT_STATUS.NONE) return EVENT_RESULT_TYPE.NOT_WON;
      else return EVENT_RESULT_TYPE.WIN;
    }
  },[])

  const getEventStatus = useCallback((event)=>{
    console.log("participantDate : "+event.participantDate);
    console.log("startDate : "+event.startDate);
    console.log("endDate : "+event.endDate);
    const startDate = event.startDate;
    const endDate = event.endDate;
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
        {getResultComment(getResultOption(eventDetail),eventDetail.option)}
      </StyledStateBox>
    </>
  );
};

export default UserEventJoinInfo;