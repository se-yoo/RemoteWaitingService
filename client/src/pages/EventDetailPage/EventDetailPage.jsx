import { Box } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ActionButtons from '../../components/ActionButtons';
import AlertDialog from '../../components/AlertDialog';
import CommonDialog from '../../components/CommonDialog';
import MenuTitle from '../../components/MenuTitle';
import { loadEventDetail, resetEmptyEvent } from '../../store/actions/event_actions';
import BasicInfo from './Sections/BasicInfo';
import NoticeInfo from './Sections/NoticeInfo';
import ParticipantInfo from './Sections/ParticipantInfo';
import QuestionInfo from './Sections/QuestionInfo';
import ShareDialogContent from './Sections/ShareDialogContent';

const EventDetailPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const [openDialogShare, setOpenDialogShare] = useState(false);
  const event = useSelector(state => state.event);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const variable = {
      eventId: id
    };

    dispatch(loadEventDetail(variable));
  }, []);

  const handleClose = useCallback(() => {
    setOpenDialogShare(false);
  }, []);

  const onClickShare = useCallback(() => {
    setOpenDialogShare(true);
  }, []);

  const onClickEdit = useCallback(() => {
    navigate(`/event/edit/${id}`);
  }, []);

  const buttons = useMemo(() => {
    return [
      { text: "삭제", color: "red" },
      { text: "공유", width: 200, variant: "outlined", onClick: onClickShare },
      { text: "수정", width: 200, onClick: onClickEdit }
    ];
  }, []);

  useEffect(() => {
    if(event.error) {
      const { message, error } = event.error;
      setErrorDialogContent(`${message} 확인을 누르시면 메인으로 돌아갑니다. \n오류: ${error.toString()}`);
      setOpenAlertError(true);
    }
  }, [event.error]);

  const navigateMain = useCallback(() => {
    dispatch(resetEmptyEvent());
    navigate("/");
  }, []);

  return (
    <div>
      <MenuTitle title={"이벤트 상세"} />
      <BasicInfo />
      <ParticipantInfo />
      <NoticeInfo />
      <QuestionInfo />
      <ActionButtons
        WrapComponent={Box}
        sx={{ mt: 6, display: "flex" , justifyContent: "end" }}
        buttons={buttons}
      />
      <CommonDialog
        open={openDialogShare}
        onClose={handleClose}
        width={900}
        title="이벤트 공유"
        subText="생성한 이벤트의 참여 페이지를 공유합니다"
        closable
        ContentComponent={<ShareDialogContent />}
      />
      <AlertDialog
        open={openAlertError}
        onAgree={navigateMain}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />  
    </div>
  );
};

export default EventDetailPage;