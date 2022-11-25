import React from 'react';
import { Box, styled } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';
import { EVENT_RESULT_TYPE } from '../../../utils/code';
import AnswerList from '../../../components/AnswerList';

const stateSuccess={
  BG_COLOR:"rgba(73,111,70,0.1)",
  COLOR:"#496F46"
}

const stateFail={
  BG_COLOR:"rgba(202,55,55,0.1)",
  COLOR:"#CA3737"
}

const stateDefault={
  BG_COLOR:"rgba(242,203,97,0.1)",
  COLOR:"#F2CB61"
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


const UserEventJoinInfo = (props) => {

  const {eventQuestion, eventAnswer, eventResult} = props;
  const stateColor = getResultColor(eventResult);

  return (
    <>
      <SectionTitle title={"참여 정보"} sx={{ mt: 6 }}/>
      <Box sx={{ mb: 1}} >{"2022-09-26 15:00:01.023"}</Box>
      <AnswerList
        hideRequired 
        questions={eventQuestion} 
        answers={eventAnswer.answers}
      />
      <SectionTitle title={"참여 현황"} sx={{ mt: 3 }}/>
      <StyledStateBox
        sx={{
          backgroundColor:stateColor.BG_COLOR,
          color:stateColor.COLOR 
        }}
      >
        {"축하합니다 당첨되셨습니다."}
      </StyledStateBox>
    </>
  );
};

export default UserEventJoinInfo;