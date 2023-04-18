import React, { memo, useEffect, useMemo } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../../components/SectionTitle";
import AnswerList from "../../../components/AnswerList";
import { formatDatetime } from "../../../utils/function";
import {
  EVENT_OPTION,
  EVENT_STATUS_TYPE,
  PARTICIPANT_STATUS,
} from "../../../utils/code";
import { theme } from "../../../styles/theme";
import { useParams } from "react-router-dom";
import { loadEventAnswerDetail } from "../../../store/actions/answer_actions";

const StyledStateBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "143px",
  borderRadius: "20px",
  whiteSpace: "pre-line",
  textAlign: "center",
});

const getResultColor = (status) => {
  switch (status) {
    case PARTICIPANT_STATUS.WIN:
    case PARTICIPANT_STATUS.ENTER:
      return theme.palette.primary.main;
    case PARTICIPANT_STATUS.ENTER_CANCEL:
      return theme.palette.red.main;
    default:
      return theme.palette.grey.main;
  }
};

const UserParticipant = memo(() => {
  const event = useSelector((state) => state.event);
  const answer = useSelector((state) => state.answer);
  const { questions, optionCd, status } = event;
  const { answers, participantDate, result, beforeAnswerCnt } = answer;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== event._id) return;

    const variable = {
      eventId: id,
      optionCd: optionCd,
    };

    dispatch(loadEventAnswerDetail(variable));
  }, [event]);

  const resultColor = useMemo(() => {
    return getResultColor(result);
  }, [result]);

  const resultComment = useMemo(() => {
    if (optionCd === EVENT_OPTION.WAITING) {
      switch (result) {
        case PARTICIPANT_STATUS.ENTER:
          return "입장이 완료되었습니다.";
        case PARTICIPANT_STATUS.ENTER_CANCEL:
          return "입장이 취소되었습니다.";
        default:
          return `대기중 / 현재 내 앞 대기팀 ${beforeAnswerCnt}팀\n\r앞에 2~3팀 대기 시 매장 앞으로 미리 와주시기 바랍니다`;
      }
    } else {
      switch (result) {
        case PARTICIPANT_STATUS.WIN:
          return "축하합니다 당첨되셨습니다.";
        default:
          return status === EVENT_STATUS_TYPE.ENDED
            ? "아쉽지만 당첨되지 않았습니다."
            : "진행중인 이벤트 입니다.";
      }
    }
  }, [result, optionCd, status, beforeAnswerCnt]);

  return (
    <>
      <SectionTitle title="참여 정보" sx={{ mt: 6 }} />
      <Box>{formatDatetime(participantDate)}</Box>
      <AnswerList hideRequired questions={questions} answers={answers} />
      <SectionTitle title="참여 현황" sx={{ mt: 3 }} />
      <StyledStateBox
        sx={{
          backgroundColor: `${resultColor}1a`,
          color: resultColor,
        }}
      >
        {resultComment}
      </StyledStateBox>
    </>
  );
});

export default UserParticipant;
