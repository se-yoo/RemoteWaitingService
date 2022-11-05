import React from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import styled from '@emotion/styled';
import CommonDialog from './CommonDialog';

const StyledAlertTitle = styled(DialogTitle)({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '32px',
  lineHeight: '39px',
  color: '#496F46'
});

const StyledAlertContentText = styled(DialogContentText)({
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '25px',
  color: '#000000',
  padding: '8px 0 30px 0'
});

const StyledAlertButton = styled(Button)({
  borderRadius: '30px',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '29px',
  color: '#FFFFFF',
  width: '160px',
  height: '60px',
  boxShadow: 'none'
});

const AlertDialog = (props) => {
  const {
    open, 
    onClose, 
    onAgree,
    title, 
    description, 
    hideDisagree,
    disagreeText, 
    agreeText,
    sx
  } = props;

  return (
    <CommonDialog
      open={open}
      sx={sx}
    >
      <StyledAlertTitle>
        {title}
      </StyledAlertTitle>
      <DialogContent>
        <StyledAlertContentText>
          {description}
        </StyledAlertContentText>
      </DialogContent>
      <DialogActions>
        {!hideDisagree && 
          <StyledAlertButton
            variant="contained"
            onClick={onClose}
            className="rws-grey-btn"
          >
            {disagreeText}
          </StyledAlertButton>
        }
        <StyledAlertButton
          variant="contained"
          onClick={onAgree || onClose}
          className="rws-green-btn"
          sx={{ ml: '14px !important' }}
        >
          {agreeText}
        </StyledAlertButton>
      </DialogActions>
    </CommonDialog>
  );
};

AlertDialog.defaultProps = {
  open: false, 
  onClose: () => {}, 
  title: '제목',
  description: '내용',
  disagreeText: '취소',
  agreeText: '확인',
  hideDisagree: false,
  sx: {}
}

export default AlertDialog;