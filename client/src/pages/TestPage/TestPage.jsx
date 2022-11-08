import { Button } from '@mui/material';
import React, { useState } from 'react';
import AlertDialog from '../../components/AlertDialog';

const TestPage = () => {
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        알림창예시
      </Button>
      <AlertDialog
        open={openAlert}
        onClose={handleClose}
        title={"이벤트 삭제"}
        content={"삭제되면 복구하지 못합니다. 정말로 삭제하시겠습니까?"}
        hideDisagree
      />      
    </div>
  );
};

export default TestPage;