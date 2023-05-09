import { Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ActionButtons from "../../components/ActionButtons";
import AlertDialog from "../../components/AlertDialog";
import CommonDialog from "../../components/CommonDialog";
import MenuTitle from "../../components/MenuTitle";
import EventBasicInfo from "../../components/EventBasicInfo";
import {
  deleteEvent,
  loadEventDetail,
  resetEmptyEvent,
} from "../../store/actions/event_actions";
import NoticeInfo from "./Sections/NoticeInfo";
import ParticipationInfo from "./Sections/ParticipationInfo";
import QuestionInfo from "./Sections/QuestionInfo";
import ShareDialogContent from "./Sections/ShareDialogContent";
import UserParticipation from "./Sections/UserParticipation";
import Auth from "../../hoc/Auth";

const EventDetailPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const [errorDialogAgree, setErrorDialogAgree] = useState(() => {});
  const [openDialogShare, setOpenDialogShare] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event);
  const userData = useSelector((state) => state.user.userData);
  const { isAdmin } = userData || { isAdmin: false };

  useEffect(() => {
    const variable = {
      eventId: eventId,
    };

    dispatch(loadEventDetail(variable));
  }, []);

  const onClose = useCallback(() => {
    setOpenDialogShare(false);
    setOpenConfirmDelete(false);
  }, []);

  const onClickShare = useCallback(() => {
    setOpenDialogShare(true);
  }, []);

  const onClickEdit = useCallback(() => {
    navigate(`/event/edit/${eventId}`);
  }, []);

  const onClickDelete = useCallback(() => {
    setOpenConfirmDelete(true);
  }, []);

  const onClickDeleteAgree = useCallback(() => {
    const body = {
      eventId: eventId,
    };

    dispatch(deleteEvent(body))
      .then((res) => {
        if (res.payload.success) {
          navigate(`/event`);
        }
      })
      .catch((err) => {
        setErrorDialogAgree(() => onClose);
        setErrorDialogContent(
          `이벤트 삭제에 실패했습니다. \n오류: ${err.toString()}`,
        );
        setOpenAlertError(true);
      });
  }, [eventId]);

  const buttons = useMemo(() => {
    return [
      { text: "삭제", color: "red", onClick: onClickDelete },
      { text: "공유", width: 200, variant: "outlined", onClick: onClickShare },
      { text: "수정", width: 200, onClick: onClickEdit },
    ];
  }, []);

  const navigateMain = useCallback(() => {
    dispatch(resetEmptyEvent());
    navigate("/");
  }, []);

  useEffect(() => {
    if (event.error) {
      const { message, error } = event.error;
      setErrorDialogAgree(() => navigateMain);
      setErrorDialogContent(
        `${message} 확인을 누르시면 메인으로 돌아갑니다. \n오류: ${error.toString()}`,
      );
      setOpenAlertError(true);
    }
  }, [event.error]);

  return (
    <div>
      <MenuTitle title="이벤트 상세" />
      <EventBasicInfo />
      {isAdmin ? <ParticipationInfo /> : <UserParticipation />}
      <NoticeInfo editable={isAdmin} />
      {isAdmin && (
        <>
          <QuestionInfo />
          <ActionButtons
            WrapComponent={Box}
            sx={{ mt: 6, display: "flex", justifyContent: "end" }}
            buttons={buttons}
          />
          <CommonDialog
            open={openDialogShare}
            onClose={onClose}
            width={900}
            title="이벤트 공유"
            subText="생성한 이벤트의 참여 페이지를 공유합니다"
            closable
            ContentComponent={<ShareDialogContent />}
          />
          <AlertDialog
            open={openConfirmDelete}
            onClose={onClose}
            onAgree={onClickDeleteAgree}
            title="이벤트 삭제"
            content="정말로 이벤트를 삭제하시겠습니까? 삭제 후 복원할 수 없습니다"
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

export default Auth(EventDetailPage, null);
