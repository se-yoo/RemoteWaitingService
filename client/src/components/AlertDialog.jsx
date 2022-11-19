import React from 'react';
import { Button, DialogActions } from '@mui/material';
import CommonDialog from './CommonDialog';

const AlertDialog = (props) => {
  const {
    open, 
    onClose, 
    onAgree,
    title, 
    content, 
    hideDisagree,
    disagreeText, 
    agreeText,
    sx
  } = props;

  const ActionComponent = () => {
    return (
      <DialogActions sx={{ px: 0 }}>
        {!hideDisagree && 
          <Button
            color="grey"
            sx={{ width: 160 }}
            variant="contained"
            onClick={onClose}
          >
            {disagreeText}
          </Button>
        }
        <Button
          variant="contained"
          onClick={onAgree || onClose}
          sx={{ width: 160, marginLeft: "14px !important" }}
        >
          {agreeText}
        </Button>
      </DialogActions>
    )
  };

  return (
    <CommonDialog
      open={open}
      sx={sx}
      title={title}
      content={content}
      ActionComponent={<ActionComponent />}
    />
  );
};

AlertDialog.defaultProps = {
  open: false, 
  onClose: () => {}, 
  title: "제목",
  content: "내용",
  disagreeText: "취소",
  agreeText: "확인",
  hideDisagree: false,
  sx: {}
}

export default AlertDialog;