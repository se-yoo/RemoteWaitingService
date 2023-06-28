import React, { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Backdrop,
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  useMediaQuery,
} from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../styles/theme";

const StyledDialogBackdrop = styled(Backdrop)({
  background: "rgba(0, 0, 0, 0.1)",
  backdropFfilter: "blur(5px)",
});

const StyledDialogTitle = styled(DialogTitle)({
  fontWeight: "700",
  fontSize: "32px",
  lineHeight: "39px",
  color: "#496F46",
  padding: "18px 0",
});

const StyledDialogSubText = styled(Box)({
  fontSize: "16px",
  color: "#BCBCBC",
});

export const StyledDialogContent = styled(DialogContent)({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "25px",
  color: "#000000",
  padding: "8px 0 30px 0",
  whiteSpace: "pre-line",
  overflowY: "unset",
  "@media(max-width: 899px)": {
    padding: "8px 0",
  },
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
    closable,
  } = props;

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const StyledDialogPaper = useMemo(() => {
    return styled(Paper)({
      background: "#FFFFFF",
      boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1) !important",
      borderRadius: "20px",
      padding: fullScreen ? "16px" : "32px 42px",
      width: width,
      maxWidth: "unset !important",
    });
  }, [width, fullScreen]);

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={onClose}
      PaperComponent={StyledDialogPaper}
      sx={sx}
      slots={{
        backdrop: StyledDialogBackdrop,
      }}
    >
      {TitleComponent ? (
        TitleComponent
      ) : (
        <StyledDialogTitle>
          {title}
          {closable && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon fontSize="large" color="primary" />
            </IconButton>
          )}
        </StyledDialogTitle>
      )}
      {subText && <StyledDialogSubText>{subText}</StyledDialogSubText>}
      {ContentComponent ? (
        ContentComponent
      ) : (
        <StyledDialogContent>{content}</StyledDialogContent>
      )}
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
  closable: false,
};

export default CommonDialog;
