import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MenuTitle from "../../components/MenuTitle";
import EventBasicInfo from "../../components/EventBasicInfo";
import SectionTitle from "../../components/SectionTitle";
import QuestionList from "../../components/QuestionList";
import ActionButtons from "../../components/ActionButtons";
import AlertDialog from "../../components/AlertDialog";
import Loading from "../../components/Loading";
import {
  loadEventDetail,
  resetEmptyEvent,
} from "../../store/actions/event_actions";
import { createAnswer } from "../../store/actions/answer_actions";
import { checkFormValidation } from "../../utils/function";
import { rules } from "../../utils/resource";
import { ANSWER_TYPE, EVENT_OPTION, EVENT_STATUS_TYPE } from "../../utils/code";
import Auth from "../../hoc/Auth";

const EventParticipationPage = () => {
  const [readyEvent, setReadyEvent] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertAgree, setOpenAlertAgree] = useState(false);
  const [openAlertParticipated, setOpenAlertParticipated] = useState(false);
  const [openAlertEnded, setOpenAlertEnded] = useState(false);
  const [checkRealTime, setCheckRealTime] = useState(false);
  const [agree, setAgree] = useState(false);
  const [formStatus, setFormStatus] = useState([]);
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector((state) => state.event);
  const answers = useSelector((state) => state.answer.answers);
  const userData = useSelector((state) => state.user.userData);
  const { isAuth } = userData || { isAuth: false };
  const { questions, participated, optionCd, status } = event;

  useEffect(() => {
    const variable = {
      eventId: eventId,
    };

    dispatch(loadEventDetail(variable));

    return () => {
      dispatch(resetEmptyEvent());
    };
  }, []);

  useEffect(() => {
    if (!readyEvent && event._id === eventId) {
      setReadyEvent(true);
    }
  }, [event._id, readyEvent]);

  useEffect(() => {
    if (checkRealTime) {
      checkParticipationFormVaildation();
    }
  }, [checkRealTime, answers]);

  useEffect(() => {
    if (isAuth && optionCd !== EVENT_OPTION.WAITING && participated) {
      setOpenAlertParticipated(true);
    }
  }, [isAuth, participated, optionCd]);

  useEffect(() => {
    if (status === EVENT_STATUS_TYPE.ENDED) {
      setOpenAlertEnded(true);
    }
  }, [status]);

  const conditions = useMemo(() => {
    return questions.map((question) => {
      let condition = [];

      if (question.required) {
        condition.push(rules.required);
      }

      if (question.answerType === ANSWER_TYPE.TEXT_EMAIL) {
        condition.push(rules.email);
      } else if (question.answerType === ANSWER_TYPE.TEXT_TELNO) {
        condition.push(rules.phoneNumber);
      }

      return condition;
    });
  }, [questions]);

  const onChangeAgree = useCallback((e) => {
    setAgree(e.target.checked);
  }, []);

  const onCloseErrorDialog = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const onCloseAgreeDialog = useCallback(() => {
    setOpenAlertAgree(false);
  }, []);

  const checkParticipationFormVaildation = useCallback(() => {
    let check = false;

    for (const index in questions) {
      const condition = conditions[index];

      if (condition.length === 0) continue;

      const result = checkFormValidation(answers, index, condition);
      setFormStatus((prevFormStatus) => {
        let newStatus = [...prevFormStatus];
        newStatus[index] = result !== true ? result : undefined;

        return newStatus;
      });

      if (result !== true) {
        check = true;
      }
    }

    return check;
  }, [questions, answers]);

  const onClickParticipation = useCallback(() => {
    const validation = checkParticipationFormVaildation();

    if (validation) {
      setCheckRealTime(true);
      return;
    } else if (!agree) {
      setOpenAlertAgree(true);
      return;
    }

    const body = {
      answers: answers,
      writer: isAuth ? userData._id : null,
      event: eventId,
    };

    dispatch(createAnswer(body))
      .then((res) => {
        if (res.payload.success) {
          navigate(
            `/event/detail/${eventId}/${
              !isAuth ? res.payload.eventAnswer._id : ""
            }`,
          );
        }
      })
      .catch(() => {
        setOpenAlertError(true);
      });
  }, [eventId, questions, answers, agree]);

  const navigateDetail = useCallback(() => {
    navigate(`/event/detail/${eventId}`);
  }, [eventId]);

  const navigateMain = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <div>
      {!readyEvent ? (
        <Loading />
      ) : (
        <>
          <MenuTitle title="이벤트 참여" />
          <EventBasicInfo hideCreateDate />
          <SectionTitle title="참여 정보" sx={{ mt: 6 }} />
          <QuestionList form questions={questions} formStatus={formStatus} />
          <FormControlLabel
            label="개인정보 수집 이용에 동의합니다."
            control={<Checkbox checked={agree} onChange={onChangeAgree} />}
          />
          <ActionButtons
            WrapComponent={Box}
            sx={{ mt: 6, display: "flex", justifyContent: "end" }}
            buttons={[
              { text: "참여", width: 200, onClick: onClickParticipation },
            ]}
          />
        </>
      )}
      <AlertDialog
        open={openAlertError}
        onAgree={onCloseErrorDialog}
        title="오류 발생"
        content="이벤트 참여에 실패했습니다."
        hideDisagree
      />
      <AlertDialog
        open={openAlertAgree}
        onAgree={onCloseAgreeDialog}
        title="이벤트 참여 실패"
        content="개인정보 수집 이용에 동의해주세요."
        hideDisagree
      />
      <AlertDialog
        open={openAlertParticipated}
        onAgree={navigateDetail}
        title="이미 참여한 이벤트"
        content="이미 참여한 이벤트입니다. 확인을 누르시면 상세 화면으로 이동합니다."
        hideDisagree
      />
      <AlertDialog
        open={openAlertEnded}
        onAgree={navigateMain}
        title="마감된 이벤트"
        content="마감된 이벤트입니다. 확인을 누르시면 메인 화면으로 이동합니다."
        hideDisagree
      />
    </div>
  );
};

export default Auth(EventParticipationPage, null);
