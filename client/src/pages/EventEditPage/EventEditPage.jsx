import { Box } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ActionButtons from '../../components/ActionButtons';
import AlertDialog from '../../components/AlertDialog';
import MenuTitle from '../../components/MenuTitle';
import { loadEventDetail, resetEmptyEvent } from '../../store/actions/event_actions';
import EditDate from './Sections/EditDate';
import EditDesc from './Sections/EditDesc';
import EditOption from './Sections/EditOption';
import EditQuestions from './Sections/EditQuestions';
import EditTitle from './Sections/EditTitle';

const EventEditPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorDialogContent, setErrorMessage] = useState("");
  const event = useSelector(state => state.event);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNew = useMemo(() => {
    return id === "new";
  }, [id]);

  useEffect(() => {
    if(isNew) {
      dispatch(resetEmptyEvent());
    } else {
      const variable = {
        eventId: id
      };

      dispatch(loadEventDetail(variable));
    }
  }, []);

  useEffect(() => {
    if(event.error) {
      setErrorMessage(`${event.errorMessage} 확인을 누르시면 메인으로 돌아갑니다. \n오류: ${event.error.toString()}`);
      setOpenAlertError(true);
    }
  }, [event.error]);

  const editType = useMemo(() => {
    return isNew ? "등록" : "수정";
  }, [isNew]);

  const onClickCancel = useCallback(() => {
    navigate(-1);
  }, []);

  const onClickEdit = useCallback(() => {
    if(isNew) {

    } else {
      //dispatch(createEvent(event));
    }
  }, [isNew, event])

  const navigateMain = useCallback(() => {
    dispatch(resetEmptyEvent());
    navigate("/");
  }, []);

  const buttons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: onClickCancel },
      { text: editType, width: 200, onClick: onClickEdit }
    ];
  }, [editType, onClickCancel, onClickEdit]);

  return (
    <div>
      <MenuTitle 
        title={`이벤트 ${editType}`}
        subText={`이벤트 참여 양식을 ${editType}합니다`}
      />
      <EditTitle sx={{ mt: 8 }} />
      <EditDesc sx={{ mt: 4 }} />
      <EditQuestions sx={{ mt: 4 }} />
      <EditDate sx={{ mt: 4 }} />
      <EditOption sx={{ mt: 4 }} />
      <ActionButtons
        WrapComponent={Box}
        sx={{ mt: 6, display: "flex" , justifyContent: "end" }}
        buttons={buttons}
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

export default EventEditPage;