import { Box, Button } from '@mui/material';
import React, { memo } from 'react';

const ActionButtons = memo((props) => {
  const {
    WrapComponent,
    sx,
    buttons
  } = props;

  return (
    <WrapComponent sx={sx}>
      {buttons.map((button, i) => (
        <Button
          key={`button-${button.text}`}
          color={button.color || "primary"}
          sx={{ 
            width: button.width || 160, 
            marginLeft: i > 0 ? "14px !important" : "",
            ...button.sx 
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
  buttons: []
}

export default ActionButtons;