import React, { useCallback, useEffect, useMemo, useState } from "react";
import Auth from "../../hoc/Auth";
import MenuTitle from "../../components/MenuTitle";
import EventBasicInfo from "../../components/EventBasicInfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadEventDetail } from "../../store/actions/event_actions";
import SectionTitle from "../../components/SectionTitle";
import QuestionList from "../../components/QuestionList";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import ActionButtons from "../../components/ActionButtons";
import AlertDialog from "../../components/AlertDialog";
import { checkFormValidation } from "../../utils/function";
import { rules } from "../../utils/resource";
import { ANSWER_TYPE } from "../../utils/code";
import { createAnswer } from "../../store/actions/answer_actions";
import { EVENT_OPTION } from "../../utils/code";

const EventParticipationPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertAgree, setOpenAlertAgree] = useState(false);
  const [openAlertParticipated, setOpenAlertParticipated] = useState(false);
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
  const { questions, participated, optionCd } = event;

  useEffect(() => {
    const variable = {
      eventId: eventId,
    };

    dispatch(loadEventDetail(variable));
  }, []);

  useEffect(() => {
    if (checkRealTime) {
      checkParticipationFormVaildation();
    }
  }, [checkRealTime, answers]);

  useEffect(() => {
    console.log(isAuth, optionCd, participated, event);
    if (isAuth && optionCd !== EVENT_OPTION.WAITING && participated) {
      setOpenAlertParticipated(true);
    }
  }, [isAuth, participated, optionCd]);

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

  return (
    <div>
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
        buttons={[{ text: "참여", width: 200, onClick: onClickParticipation }]}
      />
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
        title="참여 불가"
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
    </div>
  );
};

export default Auth(EventParticipationPage, null);
