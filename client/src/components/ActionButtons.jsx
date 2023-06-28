import { Box, Button, useMediaQuery } from "@mui/material";
import React, { memo } from "react";
import { theme } from "../styles/theme";

const ActionButtons = memo((props) => {
  const { WrapComponent, sx, buttons } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <WrapComponent sx={sx}>
      {buttons.map((button, i) => (
        <Button
          key={`button-${button.text}`}
          color={button.color || "primary"}
          sx={{
            width: button.width || (isMobile ? "50%" : 160),
            marginLeft: i > 0 ? "14px !important" : "",
            ...button.sx,
          }}
          variant={button.variant || "contained"}
          onClick={button.onClick}
        >
          {button.text}
        </Button>
      ))}
    </WrapComponent>
  );
});

ActionButtons.defaultProps = {
  WrapComponent: Box,
  sx: {},
  buttons: [],
};

export default ActionButtons;
