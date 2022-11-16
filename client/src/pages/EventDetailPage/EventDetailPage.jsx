import { Button, Grid } from '@mui/material';
import React from 'react';
import MenuTitle from '../../components/MenuTitle';
import BasicInfo from './Sections/BasicInfo';
import NoticeInfo from './Sections/NoticeInfo';
import ParticipantInfo from './Sections/ParticipantInfo';
import QuestionList from './Sections/QuestionList';

const EventDetailPage = () => {
  return (
    <div>
      <MenuTitle title={"이벤트 상세"} />
      <BasicInfo />
      <ParticipantInfo />
      <NoticeInfo />
      <QuestionList />
      <Grid
        container
        justifyContent="end"
        sx={{ mt: 6 }}
      >
        <Button
            color="red"
            sx={{ width: 160 }}
        >
          삭제
        </Button>
        <Button sx={{ width: 200, ml: 2 }} variant="outlined">
          공유
        </Button>
        <Button sx={{ width: 200, ml: 2 }}>
          수정
        </Button>
      </Grid>
    </div>
  );
};

export default EventDetailPage;