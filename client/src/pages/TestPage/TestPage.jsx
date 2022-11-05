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
      <button onClick={handleClickOpen}>알림창예시</button>
      <AlertDialog
        open={openAlert}
        onClose={handleClose}
      />      
    </div>
  );
};

export default TestPage;