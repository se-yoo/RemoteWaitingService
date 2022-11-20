import { Box } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ActionButtons from '../../components/ActionButtons';
import MenuTitle from '../../components/MenuTitle';
import { loadEventDetail, resetEmptyEvent, setEvent } from '../../store/actions/event_actions';
import EditDate from './Sections/EditDate';
import EditDesc from './Sections/EditDesc';
import EditOption from './Sections/EditOption';
import EditQuestions from './Sections/EditQuestions';
import EditTitle from './Sections/EditTitle';

const EventEditPage = (props) => {
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

      dispatch(loadEventDetail(variable))
      .then(response => {
        if(!response.payload.result) {
          alert('이벤트 정보를 가져오길 실패했습니다.');
        } else {
          dispatch(setEvent(response.payload.result));
        }
      });
    }
  }, []);

  const editType = useMemo(() => {
    return isNew ? "등록" : "수정";
  }, [isNew]);

  const onClickCancel = useCallback(() => {
    navigate(-1);
  }, []);

  const buttons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: onClickCancel },
      { text: editType, width: 200 }
    ];
  }, [editType, onClickCancel]);

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
    </div>
  );
};

export default EventEditPage;