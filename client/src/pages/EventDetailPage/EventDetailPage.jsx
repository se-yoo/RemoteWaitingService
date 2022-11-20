import { Box, Button, Grid } from '@mui/material';
import React, { useMemo } from 'react';
import ActionButtons from '../../components/ActionButtons';
import MenuTitle from '../../components/MenuTitle';
import BasicInfo from './Sections/BasicInfo';
import NoticeInfo from './Sections/NoticeInfo';
import ParticipantInfo from './Sections/ParticipantInfo';
import QuestionList from './Sections/QuestionList';

const EventDetailPage = () => {
  const buttons = useMemo(() => {
    return [
      { text: "삭제", color: "red" },
      { text: "공유", width: 200, variant: "outlined" },
      { text: "수정", width: 200 }
    ];
  }, []);

  return (
    <div>
      <MenuTitle title={"이벤트 상세"} />
      <BasicInfo />
      <ParticipantInfo />
      <NoticeInfo />
      <QuestionList />
      <ActionButtons
        WrapComponent={Box}
        sx={{ mt: 6, display: "flex" , justifyContent: "end" }}
        buttons={buttons}
      />
    </div>
  );
};

export default EventDetailPage;