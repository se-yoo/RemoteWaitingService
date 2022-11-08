import React from 'react';
import { DialogActions } from '@mui/material';
import CommonDialog, { StyledDialogButton } from './CommonDialog';

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
      <DialogActions>
        {!hideDisagree && 
          <StyledDialogButton
            color="grey"
            variant="contained"
            onClick={onClose}
          >
            {disagreeText}
          </StyledDialogButton>
        }
        <StyledDialogButton
          variant="contained"
          onClick={onAgree || onClose}
          sx={{ ml: "14px !important" }}
        >
          {agreeText}
        </StyledDialogButton>
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