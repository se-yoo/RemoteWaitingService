import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Backdrop, Button, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import styled from '@emotion/styled';

const StyledAlertPaper = styled(Paper)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1) !important",
  borderRadius: "20px",
  width: "580px",
  padding: "32px"
});

const StyledAlertBackdrop = styled(Backdrop)({
  background: "rgba(0, 0, 0, 0.1)",
  backdropFfilter: "blur(5px)"
});

export const StyledDialogButton = styled(Button)({
  fontSize: "24px",
  lineHeight: "29px",
  width: "160px",
  height: "60px",
});

const CommonDialog = (props) => {
  const {
    open,
    onClose,
    sx,
    TitleComponent,
    title,
    ContentComponent,
    content,
    ActionComponent
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropComponent={StyledAlertBackdrop}
      PaperComponent={StyledAlertPaper}
      sx={sx}
    >
      { TitleComponent ? 
          TitleComponent :
          <DialogTitle
            sx={{
              fontWeight: "700",
              fontSize: "32px",
              lineHeight: "39px",
              color: "#496F46"
            }}
          >
            {title}
          </DialogTitle>
      }
      { ContentComponent ? 
          ContentComponent :
          <DialogContent>
            <DialogContentText
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "25px",
                color: "#000000",
                padding: "8px 0 30px 0"
              }}
            >
              {content}
            </DialogContentText>
          </DialogContent>
      }
      {ActionComponent}
    </Dialog>
  );
};

CommonDialog.defaultProps = {
  open: false, 
  onClose: null,
  sx: {},
  TitleComponent: null,
  title: "제목",
  ContentComponent: null,
  content: "내용",
  ActionComponent: null
}

export default CommonDialog;