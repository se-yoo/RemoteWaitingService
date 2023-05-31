import { Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ActionButtons from "../../components/ActionButtons";
import AlertDialog from "../../components/AlertDialog";
import MenuTitle from "../../components/MenuTitle";
import {
  createEvent,
  loadEventDetail,
  resetEmptyEvent,
  updateEvent,
} from "../../store/actions/event_actions";
import { checkFormValidation } from "../../utils/function";
import { rules } from "../../utils/resource";
import EditDate from "./Sections/EditDate";
import EditDesc from "./Sections/EditDesc";
import EditOption from "./Sections/EditOption";
import EditQuestion from "./Sections/EditQuestion";
import EditTitle from "./Sections/EditTitle";
import Auth from "../../hoc/Auth";
import Loading from "../../components/Loading";

const validation = {
  title: { rules: [rules.required] },
  description: { rules: [rules.required] },
  questions: {
    rules: [
      (value) => {
        if (!Array.isArray(value) || value.length < 1)
          return "이벤트 문항은 최소 1개 이상 작성되어야 합니다.";
        else if (value.filter((v) => v.question).length !== value.length)
          return "이름이 작성되지 않은 문항이 존재합니다.";
        else return true;
      },
    ],
  },
};

const EventEditPage = () => {
  const [readyEvent, setReadyEvent] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [checkRealTime, setCheckRealTime] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const [errorDialogAgree, setErrorDialogAgree] = useState(() => {});
  const [formStatus, setFormStatus] = useState({});
  const event = useSelector((state) => state.event);
  const user = useSelector((state) => state.user);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNew = useMemo(() => {
    return eventId === "new";
  }, [eventId]);

  useEffect(() => {
    if (isNew) {
      dispatch(resetEmptyEvent());
      setReadyEvent(true);
    } else {
      const variable = {
        eventId: eventId,
      };

      dispatch(loadEventDetail(variable));
    }

    return () => {
      dispatch(resetEmptyEvent());
    };
  }, []);

  useEffect(() => {
    if (!isNew && !readyEvent && event._id === eventId) {
      setReadyEvent(true);
    }
  }, [event._id, readyEvent, isNew]);

  const onCloseErrorDialog = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const editType = useMemo(() => {
    return isNew ? "등록" : "수정";
  }, [isNew]);

  const onClickCancel = useCallback(() => {
    navigate(-1);
  }, []);

  const checkEditFormVaildation = useCallback(() => {
    let check = false;

    for (const key of Object.keys(validation)) {
      const result = checkFormValidation(event, key, validation[key].rules);

      setFormStatus((prevFormStatus) => {
        let newStatus = {};
        newStatus[key] = result !== true ? result : undefined;

        return {
          ...prevFormStatus,
          ...newStatus,
        };
      });

      if (result !== true) {
        check = true;
      }
    }

    const dateResult =
      event.noLimitDate ||
      (Boolean(event.startDate) && Boolean(event.endDate)) ||
      "날짜를 모두 입력해주세요.";

    check = check || dateResult !== true;

    setFormStatus((prevFormStatus) => {
      return {
        ...prevFormStatus,
        date: dateResult !== true ? dateResult : undefined,
      };
    });

    return check;
  }, [event]);

  useEffect(() => {
    if (checkRealTime) {
      checkEditFormVaildation();
    }
  }, [checkRealTime, event]);

  const onClickEdit = useCallback(() => {
    const check = checkEditFormVaildation();

    if (check) {
      setCheckRealTime(true);
      return;
    }

    const body = {
      _id: isNew ? undefined : eventId,
      title: event.title,
      description: event.description,
      questions: event.questions,
      startDate: event.startDate,
      endDate: event.endDate,
      noLimitDate: event.noLimitDate,
      optionCd: event.optionCd,
      writer: user.loginData._id,
    };

    if (isNew) {
      dispatch(createEvent(body))
        .then((res) => {
          if (res.payload.success) {
            navigate("/");
          }
        })
        .catch((err) => {
          setErrorDialogAgree(() => onCloseErrorDialog);
          setErrorDialogContent(
            `이벤트 등록에 실패했습니다. \n오류: ${err.toString()}`,
          );
          setOpenAlertError(true);
        });
    } else {
      dispatch(updateEvent(body))
        .then((res) => {
          if (res.payload.success) {
            navigate(`/event/detail/${eventId}`);
          }
        })
        .catch((err) => {
          setErrorDialogAgree(() => onCloseErrorDialog);
          setErrorDialogContent(
            `이벤트 수정에 실패했습니다. \n오류: ${err.toString()}`,
          );
          setOpenAlertError(true);
        });
    }
  }, [isNew, event, user]);

  const navigateMain = useCallback(() => {
    navigate("/");
  }, []);

  useEffect(() => {
    if (event.error) {
      const { message, error, closing } = event.error;
      if (closing) {
        setErrorDialogAgree(() => onCloseErrorDialog);
        setErrorDialogContent(message);
      } else {
        setErrorDialogAgree(() => navigateMain);
        setErrorDialogContent(
          `${message} 확인을 누르시면 메인으로 돌아갑니다. \n오류: ${error.toString()}`,
        );
      }
      setOpenAlertError(true);
    }
  }, [event.error, navigateMain]);

  const buttons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: onClickCancel },
      { text: editType, width: 200, onClick: onClickEdit },
    ];
  }, [editType, onClickCancel, onClickEdit]);

  return (
    <div>
      {!readyEvent ? (
        <Loading />
      ) : (
        <>
          <MenuTitle
            title={`이벤트 ${editType}`}
            subText={`이벤트 참여 양식을 ${editType}합니다`}
          />
          <EditTitle sx={{ mt: 8 }} formStatus={formStatus.title} />
          <EditDesc sx={{ mt: 4 }} formStatus={formStatus.description} />
          <EditQuestion sx={{ mt: 4 }} formStatus={formStatus.questions} />
          <EditDate sx={{ mt: 4 }} formStatus={formStatus.date} />
          <EditOption sx={{ mt: 4 }} />
          <ActionButtons
            WrapComponent={Box}
            sx={{ mt: 6, display: "flex", justifyContent: "end" }}
            buttons={buttons}
          />
        </>
      )}
      <AlertDialog
        open={openAlertError}
        onAgree={errorDialogAgree}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />
    </div>
  );
};

export default Auth(EventEditPage, true);
