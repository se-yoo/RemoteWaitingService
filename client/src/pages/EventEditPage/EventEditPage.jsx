import { Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <Grid
        container
        justifyContent="end"
        sx={{ mt: 6 }}
      >
        <Button
            color="grey"
            sx={{ width: 160 }}
            onClick={onClickCancel}
        >
          취소
        </Button>
        <Button sx={{ width: 200, ml: 2 }}>
          등록
        </Button>
      </Grid>
    </div>
  );
};

export default EventEditPage;