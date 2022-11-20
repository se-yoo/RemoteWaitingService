import { Box } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../../components/ActionButtons';
import MenuTitle from '../../components/MenuTitle';
import EditDate from './Sections/EditDate';
import EditDesc from './Sections/EditDesc';
import EditOption from './Sections/EditOption';
import EditQuestions from './Sections/EditQuestions';
import EditTitle from './Sections/EditTitle';

const EventEditPage = () => {
  const navigate = useNavigate();

  const onClickCancel = useCallback(() => {
    navigate(-1);
  }, []);

  const buttons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: onClickCancel },
      { text: "등록", width: 200 }
    ];
  }, [onClickCancel]);

  return (
    <div>
      <MenuTitle 
        title="이벤트 등록"
        subText="이벤트 참여 양식을 생성합니다"
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