import { Button, Grid, Snackbar, TextField, useTheme } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyledDialogContent } from "../../../components/CommonDialog";

const baseJoinUrl = `${window.location.protocol}//${window.location.host}/event/participation`;

const ShareDialogContent = memo(() => {
  const eventId = useSelector((state) => state.event._id);
  const [shareUrl, setShareUrl] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setShareUrl(`${baseJoinUrl}/${eventId}`);
  }, [eventId]);

  const onClickCopy = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl);
    setOpenAlert(true);
  }, [shareUrl]);

  const onClose = useCallback(() => {
    setOpenAlert(false);
  }, []);

  return (
    <StyledDialogContent sx={{ mt: 3 }}>
      <Grid container spacing={2} justifyContent="end">
        <Grid item xs={12} md>
          <TextField disabled value={shareUrl} fullWidth />
        </Grid>
        <Grid item xs="auto">
          <Button variant="outlined" sx={{ width: 160 }} onClick={onClickCopy}>
            URL 복사
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={onClose}
        message="URL이 클립보드에 복사되었습니다"
        ContentProps={{
          sx: { backgroundColor: theme.palette.primary.main },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </StyledDialogContent>
  );
});

export default ShareDialogContent;
