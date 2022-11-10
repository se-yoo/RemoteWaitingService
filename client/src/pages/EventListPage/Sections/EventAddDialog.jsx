import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import CommonDialog from '../../../components/CommonDialog';
import EventAddDialogContent from './EventAddDialogContent';

const EventAddDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onClickAddEvent = useCallback(() => {
    setOpenDialog(true);
  });

  return (
    <>
      <Button
        sx={{
          width: "200px",
          height: "60px",
          fontSize: "24px"
        }}
        onClick={onClickAddEvent}
      >
        이벤트 등록
      </Button>
      <CommonDialog
        open={openDialog}
        onClose={handleClose}
        width={900}
        title={"이벤트 등록"}
        subText={"새로 생성할 이벤트 참여 양식의 템플릿을 선택합니다"}
        ContentComponent={<EventAddDialogContent />}
      />
    </>
  );
};

export default EventAddDialog;