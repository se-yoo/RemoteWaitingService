import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Backdrop, Paper } from '@mui/material';
import styled from '@emotion/styled';

const StyledAlertPaper = styled(Paper)({
  background: '#FFFFFF',
  boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.1) !important',
  borderRadius: '20px',
  width: '580px',
  padding: '32px'
});

const StyledAlertBackdrop = styled(Backdrop)({
  background: 'rgba(0, 0, 0, 0.1)',
  backdropFfilter: 'blur(5px)'
});

const CommonDialog = (props) => {
  const {
    open,
    onClose,
    sx,
    children
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropComponent={StyledAlertBackdrop}
      PaperComponent={StyledAlertPaper}
      sx={sx}
    >
      {children}
    </Dialog>
  );
};

CommonDialog.defaultProps = {
  open: false, 
  onClose: null,
  sx: {}
}

export default CommonDialog;