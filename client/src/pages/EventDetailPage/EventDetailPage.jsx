import { Box, DialogActions } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import ActionButtons from '../../components/ActionButtons';
import CommonDialog from '../../components/CommonDialog';
import MenuTitle from '../../components/MenuTitle';
import BasicInfo from './Sections/BasicInfo';
import NoticeInfo from './Sections/NoticeInfo';
import ParticipantInfo from './Sections/ParticipantInfo';
import QuestionList from './Sections/QuestionList';
import ShareDialogContent from './Sections/ShareDialogContent';

const EventDetailPage = () => {
  const [openDialogShare, setOpenDialogShare] = useState(false);

  const handleClose = useCallback(() => {
    setOpenDialogShare(false);
  }, []);

  const onClickShare = useCallback(() => {
    setOpenDialogShare(true);
  }, []);

  const buttons = useMemo(() => {
    return [
      { text: "삭제", color: "red" },
      { text: "공유", width: 200, variant: "outlined", onClick: onClickShare },
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
      <CommonDialog
        open={openDialogShare}
        onClose={handleClose}
        width={900}
        title="이벤트 공유"
        subText="생성한 이벤트의 참여 페이지를 공유합니다"
        closable
        ContentComponent={<ShareDialogContent />}
      />
    </div>
  );
};

export default EventDetailPage;