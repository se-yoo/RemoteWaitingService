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

const UserEventJoinPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertAgree, setOpenAlertAgree] = useState(false);
  const [checkRealTime, setCheckRealTime] = useState(false);
  const [agree, setAgree] = useState(false);
  const [formStatus, setFormStatus] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector((state) => state.event);
  const answers = useSelector((state) => state.answer.answers);
  const { questions } = event;

  useEffect(() => {
    const variable = {
      eventId: id,
    };

    dispatch(loadEventDetail(variable));
  }, []);

  useEffect(() => {
    if (checkRealTime) {
      checkParticipantFormVaildation();
    }
  }, [checkRealTime, answers]);

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

  const checkParticipantFormVaildation = useCallback(() => {
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

  const onClickParticipant = useCallback(() => {
    const validation = checkParticipantFormVaildation();

    if (validation) {
      setCheckRealTime(true);
      return;
    } else if (!agree) {
      setOpenAlertAgree(true);
      return;
    }

    alert("완료");
  }, [questions, answers, agree]);

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
        buttons={[{ text: "참여", width: 200, onClick: onClickParticipant }]}
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
    </div>
  );
};

export default Auth(UserEventJoinPage, null);
