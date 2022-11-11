import React, { useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import { Backdrop, Box, Button, DialogContent, DialogTitle, IconButton, Paper } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';

const StyledDialogBackdrop = styled(Backdrop)({
  background: "rgba(0, 0, 0, 0.1)",
  backdropFfilter: "blur(5px)"
});

const StyledDialogTitle = styled(DialogTitle)({
  fontWeight: "700",
  fontSize: "32px",
  lineHeight: "39px",
  color: "#496F46",
  padding: "18px 0"
});

const StyledDialogSubText = styled(Box)({
  fontSize: "16px",
  color: "#BCBCBC",
})

export const StyledDialogContent = styled(DialogContent)({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "25px",
  color: "#000000",
  padding: "8px 0 30px 0"
})

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
    subText,
    ContentComponent,
    content,
    ActionComponent,
    width,
    closable
  } = props;

  const StyledDialogPaper = useMemo(() => {
    return styled(Paper)({
      background: "#FFFFFF",
      boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1) !important",
      borderRadius: "20px",
      padding: "32px 42px",
      width: width,
      maxWidth: "unset !important"
    })
  }, [width]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropComponent={StyledDialogBackdrop}
      PaperComponent={StyledDialogPaper}
      sx={sx}
    >
      { TitleComponent ? 
          TitleComponent :
          <StyledDialogTitle>
            {title}
            {closable && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon fontSize="large" color="primary" />
              </IconButton>
            )}
          </StyledDialogTitle>
      }
      { subText && <StyledDialogSubText>{subText}</StyledDialogSubText> }
      { ContentComponent ? 
          ContentComponent :
          <StyledDialogContent>
            {content}
          </StyledDialogContent>
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
  ActionComponent: null,
  width: "580px",
  closable: false
}

export default CommonDialog;