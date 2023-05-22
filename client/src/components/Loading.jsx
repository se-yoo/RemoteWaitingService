import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = (props) => {
  const { message, sx } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      sx={{ minHeight: "calc(100vh - 240px)", ...sx }}
    >
      <Box sx={{ fontSize: "2em", marginBottom: "1em" }}>{message}</Box>
      <CircularProgress />
    </Box>
  );
};

Loading.defaultProps = {
  message: "로딩중입니다. . .",
  sx: {},
};

export default Loading;
