import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AlertDialog = (props) => {
  const {open, onClose, title, description, digreeText, agreeText} = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {digreeText}
        </Button>
        <Button onClick={onClose}>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.defaultProps = {
  title: '제목',
  description: '내용',
  digreeText: '취소',
  agreeText: '확인'
}

export default AlertDialog;